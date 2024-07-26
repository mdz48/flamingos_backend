import { SalonRepository } from "../repositories/SalonRepositories";
import { DateUtils } from "../../shared/utils/DateUtils";
import { Salon, SalonSummary } from "../models/Salon";
import { MobiliaryRepository } from "../../mobiliary/repositories/MobiliaryRepository";

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

    public static async getAllSalonSummaries(): Promise<SalonSummary[]> {
        try {
            return await SalonRepository.findAllSummaries();
        } catch (error: any) {
            throw new Error(`Error al obtener resúmenes de salones: ${error.message}`);
        }
    }

    public static async getSalonByIdSummary(salon_id: number): Promise<SalonSummary | null> {
        try {
            return await SalonRepository.findByIdSummary(salon_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar resumen de salon: ${error.message}`);
        }
    }

    public static async addSalon(salon: Salon) {
        try {
            salon.created_at = DateUtils.formatDate(new Date());
            salon.updated_at = DateUtils.formatDate(new Date());
            salon.deleted = false;
            if (!salon.description) {
                salon.description = "Sin descripción";
            }
            return await SalonRepository.createSalon(salon);
        } catch (error: any) {
            throw new Error(`Error al crear user: ${error.message}`);
        }
    }

    public static async modifySalon(salon_id: number, salonData: Salon){
        try{
            const salonFinded =  await SalonRepository.findById(salon_id);
            if(salonFinded){
                if (salonFinded.deleted == true && salonData.deleted != false) {
                    throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
                }
                if(salonFinded.deleted){
                    salonFinded.deleted = salonData.deleted;
                }
                if (salonData.name) {
                    salonFinded.name = salonData.name;
                }
                if(salonData.capacity){
                    salonFinded.capacity = salonData.capacity;
                }
                if (salonData.description) {
                    salonFinded.description = salonData.description;
                }
            }else{
                return null;
            }
            salonFinded.updated_by = salonData.updated_by
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