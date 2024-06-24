import { SalonRepository } from "../repositories/SalonRepositories";
import { DateUtils } from "../../shared/utils/DateUtils";
import { Salon } from "../models/Salon";

export class salonService {

    public static async getAllSalons(): Promise<Salon[]> {
        try{
            return await SalonRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener los salones: ${error.message}`);
        }
    }

    public static async getSalonById(salon_id: number): Promise<Salon | null> {
        try{
            return await SalonRepository.findById(salon_id);
        }catch (error: any){
            throw new Error(`Error al encontrar user: ${error.message}`);
        }
    }

    public static async addSalon(salon: Salon) {
        try {
            salon.created_at = DateUtils.formatDate(new Date());
            salon.updated_at = DateUtils.formatDate(new Date());
            return await SalonRepository.createSalon(salon);
        } catch (error: any) {
            throw new Error(`Error al crear user: ${error.message}`);
        }
    }

    public static async modifySalon(salon_id: number, salonData: Salon){
        try{
            const salonFinded =  await SalonRepository.findById(salon_id);
            if(salonFinded){
                if(salonData.capacity){
                    salonFinded.capacity = salonData.capacity;
                }
                if(salonData.deleted){
                    salonFinded.deleted = salonData.deleted;
                }
            }else{
                return null;
            }
            salonFinded.updated_by = salonFinded.updated_by
            salonFinded.updated_at = DateUtils.formatDate(new Date());
            return await SalonRepository.updateSalon(salon_id, salonFinded);
        }catch (error: any){
            throw new Error(`Error al modificar user: ${error.message}`);
        }
    }

    public static async deleteSalon(salon_id: number): Promise<boolean> {
        try{
            return await SalonRepository.deleteSalon(salon_id);
        }catch (error: any){
            throw new Error(`Error al eliminar user: ${error.message}`);
        }
    }

}