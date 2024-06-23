import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";

export class userService {

    public static async getAllUsers(): Promise<User[]> {
        try{
            return await UserRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try{
            return await UserRepository.findById(userId);
        }catch (error: any){
            throw new Error(`Error al encontrar user: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            user.created_at = DateUtils.formatDate(new Date());
            user.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear user: ${error.message}`);
        }
    }

    public static async modifyUser(userId: number, userData: User){
        try{
            const userFinded =  await UserRepository.findById(userId);
            if(userFinded){
                if(userData.name){
                    userFinded.name = userData.name;
                }
                if(userData.deleted){
                    userFinded.deleted = userData.deleted;
                }
            }else{
                return null;
            }
            userFinded.updated_by = userFinded.updated_by
            userFinded.updated_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId, userFinded);
        }catch (error: any){
            throw new Error(`Error al modificar user: ${error.message}`);
        }
    }

    public static async deleteUser(userId: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(userId);
        }catch (error: any){
            throw new Error(`Error al eliminar user: ${error.message}`);
        }
    }


    // NAO NAO
    public static async getUserByName(name: string): Promise<User | null> {
        try {
          return await UserRepository.findByName(name);
        } catch (error: any) {
          throw new Error(`Error al encontrar user: ${error.message}`);
        }
      }

}