export interface Reservation {
    reservation_id: number | null;
    salon_id_fk: number;
    client_id_fk: number;
    package_type_id_fk: number;
    guest_amount: number;
    event_date: String;
    event_type: string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface ReservationSumary {
    reservation_id: number | null;
    salon_id_fk: number;
    client_id_fk: number;
    package_type_id_fk: number;
    guest_amount: number;
    event_date: String;
    event_type: string;
}