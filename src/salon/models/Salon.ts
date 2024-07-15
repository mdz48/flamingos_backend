export interface Salon{
    salon_id: number | null;
    name: string;
    capacity : number; 
    description : string | null;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface SalonSummary {
    salon_id: number | null;
    name: string;
    capacity : number;
    description : string;
}