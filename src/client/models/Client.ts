export interface Client {
    client_id: number | null;
    firstname: string;
    lastname: string;
    cellphone: number;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted: boolean | null; 
}
