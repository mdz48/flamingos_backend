import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User, UserSummary } from '../models/User';

export class UserRepository {
    public static async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    resolve(users);
                }
            });
        });
    }

    public static async findAllSummaries(): Promise<UserSummary[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user_id, firstname, lastname, role_user_id_fk FROM user WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const userSummaries: UserSummary[] = results as UserSummary[];
                    resolve(userSummaries);
                }
            });
        });
    }

    public static async findById(user_id: number): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE user_id = ?', [user_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByFirstName(firstname: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE firstname = ?', [firstname], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const users: User[] = results as User[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async findByIdSummary(user_id: number): Promise<UserSummary | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user_id, firstname, lastname, role_user_id_fk FROM user WHERE user_id = ? AND (deleted IS NULL OR deleted = FALSE)', [user_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const userSummaries: UserSummary[] = results as UserSummary[];
                    if (userSummaries.length > 0) {
                        resolve(userSummaries[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createUser(user: User): Promise<User> {
        const query = 'INSERT INTO user (firstname, lastname, password, role_user_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [user.firstname, user.lastname, user.password, user.role_user_id_fk, user.created_at, user.created_by, user.updated_at, user.updated_by, user.deleted], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdUserId = result.insertId;
                    const createdUser: User = { ...user, user_id: createdUserId };
                    resolve(createdUser);
                }
            });
        });
    }

    public static async updateUser(user_id: number, userData: User): Promise<User | null> {
        const query = 'UPDATE user SET firstname = ?, lastname = ?, password = ?, role_user_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [userData.firstname, userData.lastname, userData.password, userData.role_user_id_fk, userData.updated_at, userData.updated_by, userData.deleted, user_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedUser: User = { ...userData, user_id: user_id };
                        resolve(updatedUser);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteUser(user_id: number): Promise<boolean> {
        const query = 'UPDATE user SET deleted = TRUE WHERE user_id = ? AND deleted = false';
        return new Promise((resolve, reject) => {
            connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}
