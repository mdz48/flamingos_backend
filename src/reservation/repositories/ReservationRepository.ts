import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../../shared/config/database';
import { Reservation, ReservationSumary } from '../models/Reservation';
import pool from '../../shared/config/databasePromise';
import { PackageTypeSupplies } from '../models/PackageTypeSupplies';

export class ReservationRepository {

  public static async createReservationWithSupplies(reservation: Reservation): Promise<Reservation> {
    const createReservationQuery = `
      INSERT INTO reservation (
        salon_id_fk, client_id_fk, package_type_id_fk, guest_amount, event_date, event_type, 
        created_at, created_by, updated_at, updated_by, deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const getSuppliesQuery = `
      SELECT supplies_id, name, cost, description 
      FROM supplies;
    `;

    const insertPackageTypeSuppliesQuery = `
      INSERT INTO package_type_supplies (
        package_type_id_fk, supplies_id_fk, supplies_quantity
      ) VALUES (?, ?, ?);
    `;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Insert the reservation
      const [reservationResult] = await connection.execute<ResultSetHeader>(createReservationQuery, [
        reservation.salon_id_fk, reservation.client_id_fk, reservation.package_type_id_fk,
        reservation.guest_amount, reservation.event_date, reservation.event_type,
        reservation.created_at, reservation.created_by, reservation.updated_at,
        reservation.updated_by, reservation.deleted
      ]);

      const createdReservationId = reservationResult.insertId;
      const createdReservation: Reservation = { ...reservation, reservation_id: createdReservationId };

      // Get the supplies
      const [supplies] = await connection.execute<RowDataPacket[]>(getSuppliesQuery);

      // Insert the supplies into the package_type_supplies table
      for (const supply of supplies) {
        await connection.execute(insertPackageTypeSuppliesQuery, [
          reservation.package_type_id_fk, supply.supplies_id, reservation.guest_amount // Using guest_amount as supplies_quantity
        ]);
      }

      // Commit the transaction
      await connection.commit();
      return createdReservation;
    } catch (error) {
      // Rollback the transaction in case of an error
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error('Error during transaction rollback:', rollbackError);
      }

      if (error instanceof Error) {
        throw new Error(`Error al crear la reservación con suministros: ${error.message}`);
      } else {
        throw new Error('Error desconocido al crear la reservación con suministros');
      }
    } finally {
      connection.release();
    }
  }

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
    const query = 'UPDATE reservation SET deleted = TRUE WHERE reservation_id = ?';
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
