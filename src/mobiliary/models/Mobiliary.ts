export interface Mobiliary {
    mobiliary_id: number | null;
    name: string;
    stock: number;
    state: string;
    available_stock: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface MobiliarySummary {
    mobiliary_id: number | null;
    name: string;
    stock: number;
    state: string;
    available_stock: number;
}