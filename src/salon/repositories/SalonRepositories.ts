import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Salon, SalonSummary } from '../models/Salon';

export class SalonRepository {

  public static async findAll(): Promise<Salon[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM salon', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const salons: Salon[] = results as Salon[];
          resolve(salons);
        }
      });
    });
  }

  public static async findAllSummaries(): Promise<SalonSummary[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT salon_id, name, capacity, description FROM salon WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const salons: SalonSummary[] = results as SalonSummary[];
          resolve(salons);
        }
      });
    });
  }

  public static async findById(salon_id: number): Promise<Salon | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM salon WHERE salon_id = ?', [salon_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const salons: Salon[] = results as Salon[];
          if (salons.length > 0) {
            resolve(salons[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByIdSummary(salon_id: number): Promise<SalonSummary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT salon_id, name, capacity, description FROM salon WHERE salon_id = ? AND (deleted IS NULL OR deleted = FALSE)', [salon_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const salons: SalonSummary[] = results as SalonSummary[];
          if (salons.length > 0) {
            resolve(salons[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createSalon(salon: Salon): Promise<Salon> {
    const query = 'INSERT INTO salon (name, capacity, description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [salon.name, salon.capacity, salon.description, salon.created_at, salon.created_by, salon.updated_at, salon.updated_by, salon.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdSalonId = result.insertId;
          const createdSalon: Salon = { ...salon, salon_id: createdSalonId };
          resolve(createdSalon);
        }
      });
    });
  }

  public static async updateSalon(salon_id: number, salonData: Salon): Promise<Salon | null> {
    const query = 'UPDATE salon SET name = ?, capacity = ?, description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE salon_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [salonData.name, salonData.capacity, salonData.description, salonData.updated_at, salonData.updated_by, salonData.deleted, salon_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedSalon: Salon = { ...salonData, salon_id: salon_id };
            resolve(updatedSalon);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteSalon(salon_id: number): Promise<boolean> {
    const query = 'UPDATE salon SET deleted = TRUE WHERE salon_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [salon_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
