import { PackageTypeMobiliary, PackageTypeSupplies } from "../../package_type/models/PackageType";

export interface Reservation {
    reservation_id: number | null;
    salon_id_fk: number;
    client_id_fk: number;
    package_type_id_fk: number;
    guest_amount: number;
    event_date: string;
    event_type: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean | null;
    package_type_supplies?: PackageTypeSupplies[];  // Agregamos la relación si es necesario
    package_type_mobiliary?: PackageTypeMobiliary[];  // Agregamos la relación si es necesario
  }
  
  export interface ReservationSummary {
    reservation_id: number | null;
    salon_id_fk: number;
    client_id_fk: number;
    package_type_id_fk: number;
    guest_amount: number;
    event_date: string;
    event_type: string;
  }
  