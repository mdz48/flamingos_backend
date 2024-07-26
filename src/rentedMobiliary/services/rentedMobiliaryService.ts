import { RentedMobiliaryRepository } from "../repositories/RentedMobiliaryRepository";
import { RentedMobiliary, RentedMobiliarySummary } from "../models/RentedMobiliary";
import { DateUtils } from "../../shared/utils/DateUtils";

export class RentedMobiliaryService {

  public static async getAllRentedMobiliary(): Promise<RentedMobiliary[]> {
    try {
      return await RentedMobiliaryRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener mobiliario rentado: ${error.message}`);
    }
  }

  public static async getAllRentedMobiliarySummaries(): Promise<RentedMobiliarySummary[]> {
    try {
      const summaries = await RentedMobiliaryRepository.findAllSummaries();
      return summaries.map(summary => ({
        ...summary,
        rental_start_date: DateUtils.formatDateOnly(new Date(summary.rental_start_date)),
        rental_end_date: DateUtils.formatDateOnly(new Date(summary.rental_end_date))
      }));
    } catch (error: any) {
      throw new Error(`Error al obtener mobiliario rentado: ${error.message}`);
    }
  }
  

  public static async getRentedMobiliaryById(rented_mobiliary_id: number): Promise<RentedMobiliary | null> {
    try {
      return await RentedMobiliaryRepository.findById(rented_mobiliary_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar mobiliario rentado: ${error.message}`);
    }
  }

  public static async getRentedMobiliaryByIdSummaries(rented_mobiliary_id: number): Promise<RentedMobiliarySummary | null> {
    try {
      const summary = await RentedMobiliaryRepository.findByIdSummary(rented_mobiliary_id);
      if (summary) {
        summary.rental_start_date = DateUtils.formatDateOnly(new Date(summary.rental_start_date));
        summary.rental_end_date =  DateUtils.formatDateOnly(new Date(summary.rental_end_date));
        return summary;
      }
      return null;
    } catch (error: any) {
      throw new Error(`Error al encontrar mobiliario rentado: ${error.message}`);
    }
  }

  public static async addRentedMobiliary(rentedMobiliary: RentedMobiliary) {
    try {
        // const rentalStartDate = new Date(rentedMobiliary.rental_start_date.valueOf());
        // const rentalEndDate = new Date(rentedMobiliary.rental_end_date.valueOf());

        // if (!DateUtils.isDateOnOrAfterToday(rentalStartDate)) {
        //     throw new Error('La fecha de inicio de alquiler debe ser a partir de hoy.');
        // }

        // if (!DateUtils.isDateOnOrAfterToday(rentalEndDate)) {
        //     throw new Error('La fecha de finalización de alquiler debe ser a partir de hoy.');
        // }

        const today = new Date();
        rentedMobiliary.created_at = DateUtils.formatDate(today);
        rentedMobiliary.updated_at = DateUtils.formatDate(today);
        rentedMobiliary.deleted = false;

        if (!rentedMobiliary.description) {
            rentedMobiliary.description = "Sin descripción";
        }

        return await RentedMobiliaryRepository.createRentedMobiliary(rentedMobiliary);
    } catch (error: any) {
        throw new Error(`Error al crear mobiliario rentado: ${error.message}`);
    }
}

  public static async modifyRentedMobiliary(rented_mobiliary_id: number, rentedMobiliaryData: RentedMobiliary): Promise<RentedMobiliary | null> {
    try {
      const rentedMobiliary = await RentedMobiliaryRepository.findById(rented_mobiliary_id);
      if (rentedMobiliary) {
        if (rentedMobiliary.deleted == true && rentedMobiliaryData.deleted != false) {
          throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
        } 
        // if (rentedMobiliaryData.rental_start_date) {
        //   const rentalStartDate = new Date(rentedMobiliaryData.rental_start_date.valueOf());
        //   if (!DateUtils.isDateOnOrAfterToday(rentalStartDate)) {
        //     throw new Error('La fecha de inicio de alquiler debe ser a partir de hoy.');
        //   }
        //   rentedMobiliary.rental_start_date = rentedMobiliaryData.rental_start_date;
        // }
        // if (rentedMobiliaryData.rental_end_date) {
        //   const rentalEndDate = new Date(rentedMobiliaryData.rental_end_date.valueOf());
        //   if (!DateUtils.isDateOnOrAfterToday(rentalEndDate)) {
        //     throw new Error('La fecha de finalización de alquiler debe ser a partir de hoy.');
        //   }
        //   rentedMobiliary.rental_end_date = rentedMobiliaryData.rental_end_date;
        // }
        rentedMobiliary.name = rentedMobiliaryData.name || rentedMobiliary.name;
        rentedMobiliary.description = rentedMobiliaryData.description || rentedMobiliary.description;
        rentedMobiliary.rental_cost = rentedMobiliaryData.rental_cost || rentedMobiliary.rental_cost;
        rentedMobiliary.rented_by = rentedMobiliaryData.rented_by || rentedMobiliary.rented_by;
        rentedMobiliary.rental_start_date = rentedMobiliaryData.rental_start_date || rentedMobiliary.rental_start_date;
        rentedMobiliary.rental_end_date = rentedMobiliaryData.rental_end_date || rentedMobiliary.rental_end_date;
        if (rentedMobiliary.deleted) {
          rentedMobiliary.deleted = rentedMobiliaryData.deleted;
        }
        rentedMobiliary.updated_by = rentedMobiliaryData.updated_by;
        rentedMobiliary.updated_at = DateUtils.formatDate(new Date());
        return await RentedMobiliaryRepository.updateRentedMobiliary(rented_mobiliary_id, rentedMobiliary);
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
