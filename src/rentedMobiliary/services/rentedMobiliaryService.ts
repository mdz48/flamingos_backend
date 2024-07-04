import { RentedMobiliaryRepository } from "../repositories/RentedMobiliaryRepository";
import { RentedMobiliary } from "../models/RentedMobiliary";
import { DateUtils } from "../../shared/utils/DateUtils";

export class RentedMobiliaryService {

  public static async getAllRentedMobiliary(): Promise<RentedMobiliary[]> {
    try {
      return await RentedMobiliaryRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener mobiliario rentado: ${error.message}`);
    }
  }

  public static async getRentedMobiliaryById(rentedMobiliary_id: number): Promise<RentedMobiliary | null> {
    try {
      return await RentedMobiliaryRepository.findById(rentedMobiliary_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar mobiliario rentado: ${error.message}`);
    }
  }

  public static async addRentedMobiliary(rentedMobiliary: RentedMobiliary) {
    try {
      rentedMobiliary.created_at = DateUtils.formatDate(new Date());
      rentedMobiliary.updated_at = DateUtils.formatDate(new Date());
      return await RentedMobiliaryRepository.createRentedMobiliary(rentedMobiliary);
    } catch (error: any) {
      throw new Error(`Error al crear mobiliario rentado: ${error.message}`);
    }
  }

  public static async modifyRentedMobiliary(rentedMobiliary_id: number, rentedMobiliaryData: RentedMobiliary): Promise<RentedMobiliary | null> {
    try {
      const rentedMobiliary = await RentedMobiliaryRepository.findById(rentedMobiliary_id);
      if (rentedMobiliary) {
        rentedMobiliary.name = rentedMobiliaryData.name;
        rentedMobiliary.description = rentedMobiliaryData.description;
        rentedMobiliary.rental_cost = rentedMobiliaryData.rental_cost;
        rentedMobiliary.rented_by = rentedMobiliaryData.rented_by;
        rentedMobiliary.rental_start_date = DateUtils.formatDate(new Date());
        rentedMobiliary.rental_end_date = rentedMobiliaryData.rental_end_date;
        rentedMobiliary.updated_at = DateUtils.formatDate(new Date());
        rentedMobiliary.updated_by = rentedMobiliaryData.updated_by;
        rentedMobiliary.deleted = rentedMobiliaryData.deleted;
        return await RentedMobiliaryRepository.updateRentedMobiliary(rentedMobiliary_id, rentedMobiliary);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar mobiliario rentado: ${error.message}`);
    }
  }

  public static async deleteRentedMobiliary(rentedMobiliary_id: number): Promise<boolean> {
    try {
      return await RentedMobiliaryRepository.deleteRentedMobiliary(rentedMobiliary_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar mobiliario rentado: ${error.message}`);
    }
  }
}
