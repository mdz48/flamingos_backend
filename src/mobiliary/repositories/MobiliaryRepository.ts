import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Mobiliary, MobiliarySummary } from '../models/Mobiliary';

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

    public static async findAllSummaries(): Promise<MobiliarySummary[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT mobiliary_id, name, stock, state, available_stock FROM mobiliary', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const mobiliarySummaries: MobiliarySummary[] = results as MobiliarySummary[];
                    resolve(mobiliarySummaries);
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
                    const createdMobiliary = { ...mobiliary, mobiliary_id: createdMobiliaryId };
                    resolve(createdMobiliary);
                }
            });
        });
    }

    public static async updateMobiliary(mobiliary_id: number, mobiliary: Mobiliary): Promise<Mobiliary | null> {
        const query = 'UPDATE mobiliary SET name = ?, stock = ?, state = ?, available_stock = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE mobiliary_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [mobiliary.name, mobiliary.stock, mobiliary.state, mobiliary.available_stock, mobiliary.updated_at, mobiliary.updated_by, mobiliary.deleted, mobiliary_id], (error, _result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(mobiliary);
                }
            });
        });
    }

    public static async deleteMobiliary(mobiliary_id: number): Promise<boolean> {
        const query = 'UPDATE mobiliary SET deleted = 1 WHERE mobiliary_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [mobiliary_id], (error, _result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
