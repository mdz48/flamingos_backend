import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';

export interface PackageTypeSupplies {
    package_type_supplies_id: number;
    supplies_id_fk: number;
    package_type_id_fk: number,
    supplies_quantity: number,
}




