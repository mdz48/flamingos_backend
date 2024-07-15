export interface RentedMobiliary {
    rented_mobiliary_id: number | null;
    name: string;
    description: string | null;
    rental_cost: number;
    rented_by: string;
    rental_start_date: String;
    rental_end_date: String;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface RentedMobiliarySummary {
    rented_mobiliary_id: number | null;
    name: string;
    description: string;
    rental_cost: number;
    rented_by: string;
    rental_start_date: String;
    rental_end_date: String;
}