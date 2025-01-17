import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { PackageType, PackageTypeSummary, PibotData } from '../models/PackageType';

export class PackageTypeRepository {

  public static async findAll(): Promise<PackageType[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM package_type', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypes: PackageType[] = results as PackageType[];
          resolve(packageTypes);
        }
      });
    });
  }

  public static async findAllPibot(): Promise<PibotData[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM package_type_supplies', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypesSupplies: PibotData[] = results as PibotData[];
          resolve(packageTypesSupplies);
        }
      });
    });
  }

  public static async findAllSummaries(): Promise<PackageTypeSummary[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT package_type_id, name, cost, description FROM package_type WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypeSummaries: PackageTypeSummary[] = results as PackageTypeSummary[];
          resolve(packageTypeSummaries);
        }
      });
    });
  }

  public static async findAllSummariesWithSupplies(): Promise<PackageTypeSummary[]> {
    const query = `
      SELECT 
        pt.package_type_id, pt.name, pt.cost, pt.description,
        GROUP_CONCAT(s.supplies_id) AS supplies_ids,
        GROUP_CONCAT(s.name) AS supplies_names
        FROM package_type pt
        LEFT JOIN package_type_supplies pts ON pt.package_type_id = pts.package_type_id_fk
        LEFT JOIN supplies s ON pts.supplies_id_fk = s.supplies_id
        WHERE pt.deleted IS NULL OR pt.deleted = FALSE
        GROUP BY pt.package_type_id
      `;

    return new Promise((resolve, reject) => {
      connection.query(query, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          const packageTypeSummaries: PackageTypeSummary[] = (results as any[]).map(row => ({
            package_type_id: row.package_type_id,
            name: row.name,
            cost: row.cost,
            description: row.description,
            supplies: row.supplies_ids ? row.supplies_ids.split(',').map((id: string, index: number) => ({
              supplies_id: parseInt(id, 10),
              name: row.supplies_names.split(',')[index]
            })) : []
          }));
          resolve(packageTypeSummaries);
        }
      });
    });
  }

  public static async findById(package_type_id: number): Promise<PackageType | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM package_type WHERE package_type_id = ?', [package_type_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypes: PackageType[] = results as PackageType[];
          if (packageTypes.length > 0) {
            resolve(packageTypes[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByIdPibot(package_type_id: number): Promise<PibotData | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM package_type_supplies WHERE package_type_id = ?', [package_type_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypesSupplies: PibotData[] = results as PibotData[];
          if (packageTypesSupplies.length > 0) {
            resolve(packageTypesSupplies[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByIdSummary(package_type_id: number): Promise<PackageTypeSummary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT package_type_id, name, cost, description FROM package_type WHERE package_type_id = ? AND (deleted IS NULL OR deleted = FALSE)', [package_type_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const packageTypeSummaries: PackageTypeSummary[] = results as PackageTypeSummary[];
          if (packageTypeSummaries.length > 0) {
            resolve(packageTypeSummaries[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createPackageType(packageType: PackageType): Promise<PackageType> {
    const query = 'INSERT INTO package_type (name, cost, description, precreated, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [packageType.name, packageType.cost, packageType.description, packageType.precreated, packageType.created_at, packageType.created_by, packageType.updated_at, packageType.updated_by, packageType.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdPackageTypeId = result.insertId;
          const createdPackageType: PackageType = { ...packageType, package_type_id: createdPackageTypeId };
          resolve(createdPackageType);
        }
      });
    });
  }

  public static async createPibotData(pibotData: PibotData): Promise<PibotData> {
    const query = `
      INSERT INTO package_type_supplies (package_type_id_fk, supplies_id_fk)
      SELECT pt.package_type_id, s.supplies_id
      FROM package_type pt
      JOIN supplies s ON s.supplies_id = ?
      WHERE pt.package_type_id = ?;
    `;
  
    return new Promise((resolve, reject) => {
      connection.execute(query, [pibotData.supplies_id_fk, pibotData.package_type_id_fk], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdPibotDataId = result.insertId;
          const createdPibotData: PibotData = { ...pibotData, package_type_supplies_id: createdPibotDataId };
          resolve(createdPibotData);
        }
      });
    });
  }

  public static async updatePackageType(package_type_id: number, packageTypeData: PackageType): Promise<PackageType | null> {
    const query = 'UPDATE package_type SET name = ?, cost = ?, description = ?, precreated = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE package_type_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [packageTypeData.name, packageTypeData.cost, packageTypeData.description, packageTypeData.precreated, packageTypeData.updated_at, packageTypeData.updated_by, packageTypeData.deleted, package_type_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedPackageType: PackageType = { ...packageTypeData, package_type_id: package_type_id };
            resolve(updatedPackageType);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deletePackageType(package_type_id: number): Promise<boolean> {
    const query = 'UPDATE package_type SET deleted = TRUE WHERE package_type_id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [package_type_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

  public static async deletePibotDataByPackageTypeId(packageTypeId: number): Promise<boolean> {
    const deleteQuery = `DELETE FROM package_type_supplies WHERE package_type_id_fk = ?`;
    return new Promise((resolve, reject) => {
      connection.execute(deleteQuery, [packageTypeId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}


