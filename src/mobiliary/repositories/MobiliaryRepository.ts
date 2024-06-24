import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Mobiliary } from '../models/Mobiliary';

export class MobiliaryRepository {

    public static async findAll(): Promise<Mobiliary[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mobiliary', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const mobiliaries: Mobiliary[] = results as Mobiliary[];
                    resolve(mobiliaries);
                }
            });
        });
    }

    public static async findById(mobiliary_id: number): Promise<Mobiliary | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM mobiliary WHERE mobiliary_id = ?', [mobiliary_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const mobiliaries: Mobiliary[] = results as Mobiliary[];
                    if (mobiliaries.length > 0) {
                        resolve(mobiliaries[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createMobiliary(mobiliary: Mobiliary): Promise<Mobiliary> {
        const query = 'INSERT INTO mobiliary (name, stock, state, available_stock, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [mobiliary.name, mobiliary.stock, mobiliary.state, mobiliary.available_stock, mobiliary.created_at, mobiliary.created_by, mobiliary.updated_at, mobiliary.updated_by, mobiliary.deleted], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdMobiliaryId = result.insertId;
                    const createdMobiliary: Mobiliary = { ...mobiliary, mobiliary_id: createdMobiliaryId };
                    resolve(createdMobiliary);
                }
            });
        });
    }

    public static async updateMobiliary(mobiliary_id: number, mobiliaryData: Mobiliary): Promise<Mobiliary | null> {
        const query = 'UPDATE mobiliary SET name = ?, stock = ?, state = ?, available_stock = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE mobiliary_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [mobiliaryData.name, mobiliaryData.stock, mobiliaryData.state, mobiliaryData.available_stock, mobiliaryData.updated_at, mobiliaryData.updated_by, mobiliaryData.deleted, mobiliary_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedMobiliary: Mobiliary = { ...mobiliaryData, mobiliary_id: mobiliary_id };
                        resolve(updatedMobiliary);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteMobiliary(mobiliary_id: number): Promise<boolean> {
        const query = 'DELETE FROM mobiliary WHERE mobiliary_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [mobiliary_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve(true); // Eliminación exitosa
                    } else {
                        resolve(false); // Si no se encontró el mobiliario a eliminar
                    }
                }
            });
        });
    }
}
