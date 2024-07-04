import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Reservation } from '../models/Reservation';

export class ReservationRepository {

    public static async findAll(): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM reservations', (error: any, results) => {
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
            connection.query('SELECT * FROM reservations WHERE reservation_id = ?', [reservation_id], (error: any, results) => {
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
        const query = 'INSERT INTO reservations (salon_id_fk, mobiliary_id_fk, client_id_fk, guest_count, package_type, mobiliary_quantity, food_type, event_datetime, event_type, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [
                reservation.salon_id_fk,
                reservation.mobiliary_id_fk,
                reservation.client_id_fk,
                reservation.guest_count,
                reservation.package_type,
                reservation.mobiliary_quantity,
                reservation.food_type,
                reservation.event_datetime,
                reservation.event_type,
                reservation.created_at,
                reservation.created_by,
                reservation.updated_at,
                reservation.updated_by,
                reservation.deleted
            ], (error, result: ResultSetHeader) => {
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
        const query = 'UPDATE reservations SET salon_id_fk = ?, mobiliary_id_fk = ?, client_id_fk = ?, guest_count = ?, package_type = ?, mobiliary_quantity = ?, food_type = ?, event_datetime = ?, event_type = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE reservation_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [
                reservationData.salon_id_fk,
                reservationData.mobiliary_id_fk,
                reservationData.client_id_fk,
                reservationData.guest_count,
                reservationData.package_type,
                reservationData.mobiliary_quantity,
                reservationData.food_type,
                reservationData.event_datetime,
                reservationData.event_type,
                reservationData.updated_at,
                reservationData.updated_by,
                reservationData.deleted,
                reservation_id
            ], (error, result: ResultSetHeader) => {
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
        const query = 'DELETE FROM reservations WHERE reservation_id = ?';
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
