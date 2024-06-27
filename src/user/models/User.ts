export interface User {
    user_id: number | null;
    name: string;
    password: string;
    role: string;
    created_at: String;
    created_by: string;
    updated_at: String;
    updated_by: string;
    deleted: boolean;
}