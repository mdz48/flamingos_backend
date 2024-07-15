import { SuppliesRepository } from "../repositories/SuppliesRepository";
import { Supplies, SuppliesSummary } from "../models/Supplies";
import { DateUtils } from "../../shared/utils/DateUtils";

export class SuppliesService {

    public static async getAllSupplies(): Promise<Supplies[]> {
        try {
            return await SuppliesRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener suministros: ${error.message}`);
        }
    }

    public static async getAllSuppliesSummaries(): Promise<SuppliesSummary[]> {
        try {
            return await SuppliesRepository.findAllSummaries();
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

    public static async getSuppliesByIdSummary(suppliesId: number): Promise<SuppliesSummary | null> {
        try {
            return await SuppliesRepository.findByIdSummary(suppliesId);
        } catch (error: any) {
            throw new Error(`Error al encontrar suministro: ${error.message}`);
        }
    }

    public static async addSupplies(supplies: Supplies) {
        try {
            supplies.created_at = DateUtils.formatDate(new Date());
            supplies.updated_at = DateUtils.formatDate(new Date());
            supplies.deleted = false;
            if (!supplies.description) {
                supplies.description = "Sin descripción";
            }
            return await SuppliesRepository.createSupplies(supplies);
        } catch (error: any) {
            throw new Error(`Error al crear suministro: ${error.message}`);
        }
    }

    public static async modifySupplies(suppliesId: number, suppliesData: Supplies) {
        try {
            const suppliesFound = await SuppliesRepository.findById(suppliesId);
            if (suppliesFound) {
                if (suppliesFound.deleted && suppliesData.deleted) {
                    throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
                }
                if (suppliesData.name) {
                    suppliesFound.name = suppliesData.name;
                }
                if (suppliesData.cost) {
                    suppliesFound.cost = suppliesData.cost;
                }
                if (suppliesData.description) {
                    suppliesFound.description = suppliesData.description;
                }
                if (suppliesFound.deleted) {
                    suppliesFound.deleted = suppliesData.deleted;
                }
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
