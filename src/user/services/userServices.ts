import { UserRepository } from "../repositories/UserRepository";
import { User, UserSummary } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class UserService {
    public static async login(mail: string, password: string) {
        try {
            const user = await this.getUserByMail(mail);
            if (!user) {
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            const payload = {
                user_id: user.user_id,
                role: user.role_user_id_fk,
                firstname: user.firstname,
                lastname: user.lastname
            };
            return await jwt.sign(payload, secretKey, { expiresIn: '3h' });
        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }
    }

    public static async getAllUsers(): Promise<User[]> {
        try {
            return await UserRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getAllUsersSummaries(): Promise<UserSummary[]> {
        try {
            return await UserRepository.findAllSummaries();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try {
            return await UserRepository.findById(userId);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async getUserByMail(mail: string): Promise<User | null> {
        try {
            return await UserRepository.findByMail(mail);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async getUserByIdSummary(userId: number): Promise<UserSummary | null> {
        try {
            return await UserRepository.findByIdSummary(userId);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            const usedMail = await UserRepository.findByMail(user.mail);
            if (usedMail) {
                throw new Error("Este correo ya está registrado");
            }
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            user.deleted = false;
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User) {
        try {
            const userFinded = await UserRepository.findById(userId);
            const salt = await bcrypt.genSalt(saltRounds);

            if (userFinded) {
                if (userFinded.deleted && userData.deleted) {
                    throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
                }
                if (userData.mail) {
                    const usedMail = await UserRepository.findByMail(userData.mail);
                    if (usedMail) throw new Error("Este correo ya está registrado");
                    userFinded.mail = userData.mail;
                }
                if (userData.firstname) {
                    userFinded.firstname = userData.firstname;
                }
                if (userData.lastname) {
                    userFinded.lastname = userData.lastname;
                }
                if (userData.password) {
                    userFinded.password = await bcrypt.hash(userData.password, salt);
                }
                if (userData.role_user_id_fk) {
                    userFinded.role_user_id_fk = userData.role_user_id_fk;
                }
                if (userFinded.deleted) {
                    userFinded.deleted = userData.deleted;
                }
            } else {
                return null;
            }
            userFinded.updated_by = userData.updated_by;
            userFinded.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar usuario: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try {
            return await UserRepository.deleteUser(userId);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}
