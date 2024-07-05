export interface Reservation {
    reservation_id: number | null;
    salon_id_fk: number;
    mobiliary_id_fk: number;
    client_id_fk: number;
    guest_count: number;
    package_type: string;
    mobiliary_quantity: number;
    food_type: string;
    event_datetime: String;
    event_type: string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}
