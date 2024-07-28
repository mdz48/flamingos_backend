import { MobiliaryRepository } from "../repositories/MobiliaryRepository";
import { Mobiliary, MobiliarySummary } from "../models/Mobiliary";
import { DateUtils } from "../../shared/utils/DateUtils";
import { SalonRepository } from "../../salon/repositories/SalonRepositories";

export class MobiliaryService {

    public static async getAllMobiliaries(): Promise<Mobiliary[]> {
        try {
            return await MobiliaryRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener mobiliarios: ${error.message}`);
        }
    }

    public static async getAllMobiliarySummaries(): Promise<MobiliarySummary[]> {
        try {
            return await MobiliaryRepository.findAllSummaries();
        } catch (error: any) {
            throw new Error(`Error al obtener resúmenes de mobiliarios: ${error.message}`);
        }
    }

    public static async getMobiliaryById(mobiliaryId: number): Promise<Mobiliary | null> {
        try {
            return await MobiliaryRepository.findById(mobiliaryId);
        } catch (error: any) {
            throw new Error(`Error al encontrar mobiliario: ${error.message}`);
        }
    }

    public static async getMobiliaryByIdSummaries(mobiliaryId: number): Promise<MobiliarySummary | null> {
        try {
            return await MobiliaryRepository.findByIdSummary(mobiliaryId);
        } catch (error: any) {
            throw new Error(`Error al encontrar mobiliario: ${error.message}`);
        }
    }

    public static async addMobiliary(mobiliary: Mobiliary) {
        try {
            mobiliary.created_at = DateUtils.formatDate(new Date());
            mobiliary.updated_at = DateUtils.formatDate(new Date());
            mobiliary.deleted = false;
            const salon = await SalonRepository.findById(mobiliary.salon_id_fk);
            if (salon?.deleted) {
                throw new Error("Este salón esta deshabilitado");
            }
            if (!mobiliary.description) {
                mobiliary.description = 'Sin descripción';
            }
            return await MobiliaryRepository.createMobiliary(mobiliary);
        } catch (error: any) {
            throw new Error(`Error al crear mobiliario: ${error.message}`);
        }
    }

    public static async modifyMobiliary(mobiliary_id: number, mobiliaryData: Mobiliary): Promise<Mobiliary | null> {
        try {
            const mobiliaryFound = await MobiliaryRepository.findById(mobiliary_id);
            if (mobiliaryFound) {
                if (mobiliaryFound.deleted == true && mobiliaryData.deleted != false) {
                    throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
                } 
                const salon = await SalonRepository.findById(mobiliaryData.salon_id_fk);
                if (salon?.deleted) {
                throw new Error("Este salón esta deshabilitado");
                }   
                mobiliaryFound.salon_id_fk = mobiliaryData.salon_id_fk || mobiliaryFound.salon_id_fk;
                mobiliaryFound.name = mobiliaryData.name || mobiliaryFound.name;
                mobiliaryFound.stock = mobiliaryData.stock || mobiliaryFound.stock;
                mobiliaryFound.state = mobiliaryData.state || mobiliaryFound.state;
                mobiliaryFound.description = mobiliaryData.description || mobiliaryFound.description;
                if (mobiliaryFound.deleted) {
                    mobiliaryFound.deleted = mobiliaryData.deleted;
                }
                mobiliaryFound.updated_by = mobiliaryData.updated_by;
                mobiliaryFound.updated_at = DateUtils.formatDate(new Date());
                return await MobiliaryRepository.updateMobiliary(mobiliary_id, mobiliaryFound);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar mobiliario: ${error.message}`);
        }
    }

    public static async deleteMobiliary(mobiliaryId: number): Promise<boolean> {
        try {
            return await MobiliaryRepository.deleteMobiliary(mobiliaryId);
        } catch (error: any) {
            throw new Error(`Error al eliminar mobiliario: ${error.message}`);
        }
    }
}
