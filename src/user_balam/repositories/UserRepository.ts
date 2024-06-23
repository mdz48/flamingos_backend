import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

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

  public static async findById(iduser: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE iduser = ?', [iduser], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const employees: User[] = results as User[];
          if (employees.length > 0) {
            resolve(employees[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (name, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(user);
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.name, user.created_at, user.created_by, user.updated_at, user.updated_by, user.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, iduser: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(iduser: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.name, userData.updated_at, userData.updated_by, userData.deleted, iduser], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: User = { ...userData, iduser: iduser };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(iduser: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [iduser], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

  // NAO NAO

  public static async findByName(name: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE name = ?', [name], (error: any, results) => {
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

}