export interface Mobiliary {
    mobiliary_id: number | null;
    salon_id_fk: number;
    name: string;
    stock: number;
    state: string;
    description: string | null;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface MobiliarySummary {
    mobiliary_id: number | null;
    salon_id_fk: number;
    name: string;
    stock: number;
    state: string;
    description: string;
}