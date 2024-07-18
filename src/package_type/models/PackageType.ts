export interface PackageType {
    package_type_id: number;
    name: string;
    cost: number;
    description: string;
    precreated: boolean | null;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface PackageTypeSummary {
    package_type_id: number;
    name: string;
    cost: number;
    description: string;
}

export interface PackageTypeSupplies {
    package_type_supplies_id: number;
    supplies_id_fk: number;
    package_type_id_fk: number;
    supplies_quantity: number;
  }

  export interface PackageTypeMobiliary {
    package_type_mobiliary_id: number;
    mobiliary_id_fk: number;
    package_type_id_fk: number;
    mobiliary_quantity: number;
  }

  
