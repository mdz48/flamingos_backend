export interface Supplies{
    supplies_id: number | null;
    name: string;
    cost: number;
    description: string | null;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface SuppliesSummary {
    supplies_id: number | null;
    name: string;
    cost: number;
    description: string;
}