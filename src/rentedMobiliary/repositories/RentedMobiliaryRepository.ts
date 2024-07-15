import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { RentedMobiliary, RentedMobiliarySummary } from '../models/RentedMobiliary';

export class RentedMobiliaryRepository {
  
  public static async findAll(): Promise<RentedMobiliary[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rented_mobiliary', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rentedMobiliary: RentedMobiliary[] = results as RentedMobiliary[];
          resolve(rentedMobiliary);
        }
      });
    });
  }

  public static async findAllSummaries(): Promise<RentedMobiliarySummary[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT rented_mobiliary_id, name, description, rental_cost, rented_by, rental_start_date, rental_end_date FROM rented_mobiliary WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rentedMobiliarySummaries: RentedMobiliarySummary[] = results as RentedMobiliarySummary[];
          resolve(rentedMobiliarySummaries);
        }
      });
    });
  }

  public static async findById(rented_mobiliary_id: number): Promise<RentedMobiliary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rented_mobiliary WHERE rented_mobiliary_id = ?', [rented_mobiliary_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rentedMobiliary: RentedMobiliary[] = results as RentedMobiliary[];
          if (rentedMobiliary.length > 0) {
            resolve(rentedMobiliary[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByIdSummary(rentedMobiliary_id: number): Promise<RentedMobiliarySummary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT rented_mobiliary_id, name, description, rental_cost, rented_by, rental_start_date, rental_end_date FROM rented_mobiliary WHERE rented_mobiliary_id = ? AND (deleted IS NULL OR deleted = FALSE)', [rentedMobiliary_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const rentedMobiliarySummaries: RentedMobiliarySummary[] = results as RentedMobiliarySummary[];
          if (rentedMobiliarySummaries.length > 0) {
            resolve(rentedMobiliarySummaries[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createRentedMobiliary(rentedMobiliary: RentedMobiliary): Promise<RentedMobiliary> {
    const query = 'INSERT INTO rented_mobiliary (name, description, rental_cost, rented_by, rental_start_date, rental_end_date, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        rentedMobiliary.name, 
        rentedMobiliary.description, 
        rentedMobiliary.rental_cost, 
        rentedMobiliary.rented_by, 
        rentedMobiliary.rental_start_date, 
        rentedMobiliary.rental_end_date, 
        rentedMobiliary.created_at, 
        rentedMobiliary.created_by, 
        rentedMobiliary.updated_at, 
        rentedMobiliary.updated_by, 
        rentedMobiliary.deleted
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdRentedMobiliaryId = result.insertId;
          const createdRentedMobiliary: RentedMobiliary = { ...rentedMobiliary, rented_mobiliary_id: createdRentedMobiliaryId };
          resolve(createdRentedMobiliary);
        }
      });
    });
  }

  public static async updateRentedMobiliary(rented_mobiliary_id: number, rentedMobiliaryData: RentedMobiliary): Promise<RentedMobiliary | null> {
    const query = 'UPDATE rented_mobiliary SET name = ?, description = ?, rental_cost = ?, rented_by = ?, rental_start_date = ?, rental_end_date = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE rented_mobiliary_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
        rentedMobiliaryData.name, 
        rentedMobiliaryData.description, 
        rentedMobiliaryData.rental_cost, 
        rentedMobiliaryData.rented_by, 
        rentedMobiliaryData.rental_start_date, 
        rentedMobiliaryData.rental_end_date, 
        rentedMobiliaryData.updated_at, 
        rentedMobiliaryData.updated_by, 
        rentedMobiliaryData.deleted, 
        rented_mobiliary_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRentedMobiliary: RentedMobiliary = { ...rentedMobiliaryData, rented_mobiliary_id: rented_mobiliary_id };
            resolve(updatedRentedMobiliary);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRentedMobiliary(rentedMobiliary_id: number): Promise<boolean> {
    const query = 'UPDATE rented_mobiliary SET deleted = TRUE WHERE rented_mobiliary_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rentedMobiliary_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
