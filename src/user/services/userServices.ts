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

    public static async addUser(user: User): Promise<User | { error: string }> {
        try {
            const usedMail = await UserRepository.findByMail(user.mail);
            if (usedMail) {
                return { error: "Este correo ya está registrado" };
            }
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            user.deleted = false;
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear usuario ${error.message}`);
            
        }
    }
    
    public static async modifyUser(userId: number, userData: User): Promise<User | { error: string } | null> {
        try {
            const userFound = await UserRepository.findById(userId);
            if (!userFound) {
                return null;
            }
            const salt = await bcrypt.genSalt(saltRounds);
    
            if (userFound.deleted && userData.deleted) {
                return { error: "Este registro está deshabilitado, habilítalo para actualizarlo" };
            }
            if (userData.mail && userData.mail != userFound.mail) {
                const usedMail = await UserRepository.findByMail(userData.mail);
                if (usedMail) {
                    return { error: "Este correo ya está registrado" };
                }
                userFound.mail = userData.mail;
            }
            if (userData.firstname) {
                userFound.firstname = userData.firstname;
            }
            if (userData.lastname) {
                userFound.lastname = userData.lastname;
            }
            if (userData.password) {
                userFound.password = await bcrypt.hash(userData.password, salt);
            }
            if (userData.role_user_id_fk) {
                userFound.role_user_id_fk = userData.role_user_id_fk;
            }
            if (userFound.deleted) {
                userFound.deleted = userData.deleted;
            }
            userFound.updated_by = userData.updated_by;
            userFound.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFound);
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
