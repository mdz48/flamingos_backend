import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { RentedMobiliary } from '../models/RentedMobiliary';

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

  public static async findById(rentedMobiliary_id: number): Promise<RentedMobiliary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM rented_mobiliary WHERE rentedMobiliary_id = ?', [rentedMobiliary_id], (error: any, results) => {
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

  public static async createRentedMobiliary(rentedMobiliary: RentedMobiliary): Promise<RentedMobiliary> {
    const query = 'INSERT INTO rented_mobiliary (name, description, rental_cost, rented_by, rental_start_date, rental_end_date, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rentedMobiliary.name, rentedMobiliary.description, rentedMobiliary.rental_cost, rentedMobiliary.rented_by, rentedMobiliary.rental_start_date, rentedMobiliary.rental_end_date, rentedMobiliary.created_at, rentedMobiliary.created_by, rentedMobiliary.updated_at, rentedMobiliary.updated_by, rentedMobiliary.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdMobiliaryId = result.insertId;
          const createdRentedMobiliary: RentedMobiliary = { ...rentedMobiliary, rentedMobiliary_id: createdMobiliaryId };
          resolve(createdRentedMobiliary);
        }
      });
    });
  }

  public static async updateRentedMobiliary(rentedMobiliary_id: number, rentedMobiliaryData: RentedMobiliary): Promise<RentedMobiliary | null> {
    const query = 'UPDATE rented_mobiliary SET name = ?, description = ?, rental_cost = ?, rented_by = ?, rental_start_date = ?, rental_end_date = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE rentedMobiliary_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rentedMobiliaryData.name, rentedMobiliaryData.description, rentedMobiliaryData.rental_cost, rentedMobiliaryData.rented_by, rentedMobiliaryData.rental_start_date, rentedMobiliaryData.rental_end_date, rentedMobiliaryData.updated_at, rentedMobiliaryData.updated_by, rentedMobiliaryData.deleted, rentedMobiliary_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedRentedMobiliary: RentedMobiliary = { ...rentedMobiliaryData, rentedMobiliary_id: rentedMobiliary_id };
            resolve(updatedRentedMobiliary);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRentedMobiliary(rentedMobiliary_id: number): Promise<boolean> {
    const query = 'DELETE FROM rented_mobiliary WHERE rentedMobiliary_id = ?';
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
