export interface User {
    user_id: number | null;
    firstname: string;
    lastname: string;
    password: string;
    role_user_id_fk: number;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean | null;
}

export interface UserSummary {
    user_id: number | null;
    firstname: string;
    lastname: string;
    password: string;
    role_user_id_fk: number;
}