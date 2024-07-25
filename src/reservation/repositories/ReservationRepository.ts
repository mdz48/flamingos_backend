import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Reservation, ReservationSumary } from '../models/Reservation';

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

  public static async findAllSummaries(): Promise<ReservationSumary[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT reservation_id, salon_id_fk, client_id_fk, package_type_id_fk, guest_amount, event_date, event_type FROM reservation WHERE deleted IS NULL OR deleted = FALSE', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservationSummaries: ReservationSumary[] = results as ReservationSumary[];
          resolve(reservationSummaries);
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

  public static async findByIdSummary(reservation_id: number): Promise<ReservationSumary | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT reservation_id, salon_id_fk, client_id_fk, package_type_id_fk, guest_amount, event_date, event_type FROM reservation WHERE reservation_id = ? AND (deleted IS NULL OR deleted = FALSE)', [reservation_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const reservationSummaries: ReservationSumary[] = results as ReservationSumary[];
          if (reservationSummaries.length > 0) {
            resolve(reservationSummaries[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async checkReservationExists(eventDate: String): Promise<boolean> {
    const query = 'SELECT COUNT(*) AS count FROM reservation WHERE event_date = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [eventDate], (error, results: any[]) => {
        if (error) {
          reject(error);
        } else {
          const count = results[0].count;
          resolve(count > 0);
        }
      });
    });
  }

  public static async addReservation(reservation: Reservation): Promise<Reservation | { message: string }> {
    try {
      const reservationExists = await ReservationRepository.checkReservationExists(reservation.event_date);
      if (reservationExists) {
        return { message: 'Ya existe una reserva para esta fecha.' };
      }
  
      reservation.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
      reservation.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
      reservation.deleted = false;
      return await ReservationRepository.createReservation(reservation);
    } catch (error: any) {
      throw new Error(`Error al crear la reservación: ${error.message}`);
    }
  }
  
  
  public static async createReservation(reservation: Reservation): Promise<Reservation> {
    const query = 'INSERT INTO reservation (salon_id_fk, client_id_fk, package_type_id_fk, guest_amount, event_date, event_type, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservation.salon_id_fk, reservation.client_id_fk, reservation.package_type_id_fk, reservation.guest_amount, reservation.event_date, reservation.event_type, reservation.created_at, reservation.created_by, reservation.updated_at, reservation.updated_by, reservation.deleted], (error, result: ResultSetHeader) => {
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
    const query = 'UPDATE reservation SET salon_id_fk = ?, client_id_fk = ?, package_type_id_fk = ?, guest_amount = ?, event_date = ?, event_type = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE reservation_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservationData.salon_id_fk, reservationData.client_id_fk, reservationData.package_type_id_fk, reservationData.guest_amount, reservationData.event_date, reservationData.event_type, reservationData.updated_at, reservationData.updated_by, reservationData.deleted, reservation_id], (error, result: ResultSetHeader) => {
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
    const query = 'UPDATE reservation SET deleted = TRUE WHERE reservation_id = ? AND deleted = false';
    return new Promise((resolve, reject) => {
      connection.execute(query, [reservation_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }

}
