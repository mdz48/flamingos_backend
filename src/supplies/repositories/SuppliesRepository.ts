import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Supplies, SuppliesSummary } from '../models/Supplies';

export class SuppliesRepository {

    public static async findAll(): Promise<Supplies[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM supplies', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const supplies: Supplies[] = results as Supplies[];
                    resolve(supplies);
                }
            });
        });
    }

    public static async findAllSummaries(): Promise<SuppliesSummary[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT supplies_id, name, cost, description FROM supplies WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const supplies: SuppliesSummary[] = results as SuppliesSummary[];
                    resolve(supplies);
                }
            });
        });
    }

    public static async findById(supplies_id: number): Promise<Supplies | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM supplies WHERE supplies_id = ?', [supplies_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const supplies: Supplies[] = results as Supplies[];
                    if (supplies.length > 0) {
                        resolve(supplies[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByIdSummary(supplies_id: number): Promise<SuppliesSummary | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT supplies_id, name, cost, description FROM supplies WHERE supplies_id = ? AND (deleted IS NULL OR deleted = FALSE)', [supplies_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const supplies: SuppliesSummary[] = results as SuppliesSummary[];
                    if (supplies.length > 0) {
                        resolve(supplies[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createSupplies(supplies: Supplies): Promise<Supplies> {
        const query = 'INSERT INTO supplies (name, cost, description, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [supplies.name, supplies.cost, supplies.description, supplies.created_at, supplies.created_by, supplies.updated_at, supplies.updated_by, supplies.deleted], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdSuppliesId = result.insertId;
                    const createdSupplies: Supplies = { ...supplies, supplies_id: createdSuppliesId };
                    resolve(createdSupplies);
                }
            });
        });
    }

    public static async updateSupplies(supplies_id: number, suppliesData: Supplies): Promise<Supplies | null> {
        const query = 'UPDATE supplies SET name = ?, cost = ?, description = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE supplies_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [suppliesData.name, suppliesData.cost, suppliesData.description, suppliesData.updated_at, suppliesData.updated_by, suppliesData.deleted, supplies_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedSupplies: Supplies = { ...suppliesData, supplies_id: supplies_id };
                        resolve(updatedSupplies);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteSupplies(supplies_id: number): Promise<boolean> {
        const query = 'UPDATE supplies SET deleted = TRUE WHERE supplies_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [supplies_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}
