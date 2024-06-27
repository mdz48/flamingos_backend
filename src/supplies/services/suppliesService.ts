import { SuppliesRepository } from "../repositories/SuppliesRepository";
import { Supplies } from "../models/Supplies";
import { DateUtils } from "../../shared/utils/DateUtils";

export class SuppliesService {

    public static async getAllSupplies(): Promise<Supplies[]> {
        try {
            return await SuppliesRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener suministros: ${error.message}`);
        }
    }

    public static async getSuppliesById(suppliesId: number): Promise<Supplies | null> {
        try {
            return await SuppliesRepository.findById(suppliesId);
        } catch (error: any) {
            throw new Error(`Error al encontrar suministro: ${error.message}`);
        }
    }

    public static async addSupplies(supplies: Supplies) {
        try {
            supplies.created_at = DateUtils.formatDate(new Date());
            supplies.updated_at = DateUtils.formatDate(new Date());
            return await SuppliesRepository.createSupplies(supplies);
        } catch (error: any) {
            throw new Error(`Error al crear suministro: ${error.message}`);
        }
    }

    public static async modifySupplies(suppliesId: number, suppliesData: Supplies) {
        try {
            const suppliesFound = await SuppliesRepository.findById(suppliesId);
            if (suppliesFound) {
                suppliesFound.name = suppliesData.name || suppliesFound.name;
                suppliesFound.stock = suppliesData.stock || suppliesFound.stock;
                suppliesFound.price = suppliesData.price || suppliesFound.price;
                suppliesFound.deleted = suppliesData.deleted !== undefined ? suppliesData.deleted : suppliesFound.deleted;
            } else {
                return null;
            }
            suppliesFound.updated_by = suppliesData.updated_by;
            suppliesFound.updated_at = DateUtils.formatDate(new Date());
            return await SuppliesRepository.updateSupplies(suppliesId, suppliesFound);
        } catch (error: any) {
            throw new Error(`Error al modificar suministro: ${error.message}`);
        }
    }

    public static async deleteSupplies(suppliesId: number): Promise<boolean> {
        try {
            return await SuppliesRepository.deleteSupplies(suppliesId);
        } catch (error: any) {
            throw new Error(`Error al eliminar suministro: ${error.message}`);
        }
    }
}
