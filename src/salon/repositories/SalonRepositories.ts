import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Salon } from '../models/Salon';

export class SalonRepository {

  public static async findAll(): Promise<Salon[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM salon', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const salon: Salon[] = results as Salon[];
          resolve(salon);
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
          const salon: Salon[] = results as Salon[];
          if (salon.length > 0) {
            resolve(salon[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createSalon(salon: Salon): Promise<Salon> {
    const query = 'INSERT INTO salon (capacity, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(salon);
    return new Promise((resolve, reject) => {
      connection.execute(query, [salon.capacity, salon.created_at, salon.created_by, salon.updated_at, salon.updated_by, salon.deleted], (error, result: ResultSetHeader) => {
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
    const query = 'UPDATE salon SET capacity = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE salon_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [salonData.capacity, salonData.updated_at, salonData.updated_by, salonData.deleted, salon_id], (error, result: ResultSetHeader) => {
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
    const query = 'DELETE FROM salon WHERE salon_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [salon_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}