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

export interface PibotData {
    package_type_supplies_id?: number;
    package_type_id_fk: number;
    supplies_id_fk: number;
}
