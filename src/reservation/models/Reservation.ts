export interface Reservation{
    reservation_id: number | null;
    salon_id_fk: number,
    user_id_fk: number,
    mobiliary_id_fk: number,
    supplies_id_fk: number,
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}