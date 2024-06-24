import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Reservation } from '../models/Reservation';

export class ReservationRepository {

    public static async findAll(): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM reservation', (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const reservations: Reservation[] = results as Reservation[];
                    resolve(reservations);
                }
            });
        });
    }

    public static async findById(reservation_id: number): Promise<Reservation | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM reservation WHERE reservation_id = ?', [reservation_id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const reservations: Reservation[] = results as Reservation[];
                    if (reservations.length > 0) {
                        resolve(reservations[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createReservation(reservation: Reservation): Promise<Reservation> {
        const query = 'INSERT INTO reservation (salon_id_fk, user_id_fk, mobiliary_id_fk, supplies_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [reservation.salon_id_fk, reservation.user_id_fk, reservation.mobiliary_id_fk, reservation.supplies_id_fk, reservation.created_at, reservation.created_by, reservation.updated_at, reservation.updated_by, reservation.deleted], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdReservationId = result.insertId;
                    const createdReservation: Reservation = { ...reservation, reservation_id: createdReservationId };
                    resolve(createdReservation);
                }
            });
        });
    }

    public static async updateReservation(reservation_id: number, reservationData: Reservation): Promise<Reservation | null> {
        const query = 'UPDATE reservation SET salon_id_fk = ?, user_id_fk = ?, mobiliary_id_fk = ?, supplies_id_fk = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE reservation_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [reservationData.salon_id_fk, reservationData.user_id_fk, reservationData.mobiliary_id_fk, reservationData.supplies_id_fk, reservationData.updated_at, reservationData.updated_by, reservationData.deleted, reservation_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedReservation: Reservation = { ...reservationData, reservation_id: reservation_id };
                        resolve(updatedReservation);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteReservation(reservation_id: number): Promise<boolean> {
        const query = 'DELETE FROM reservation WHERE reservation_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [reservation_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve(true); // Eliminación exitosa
                    } else {
                        resolve(false); // Si no se encontró la reservación a eliminar
                    }
                }
            });
        });
    }
}
