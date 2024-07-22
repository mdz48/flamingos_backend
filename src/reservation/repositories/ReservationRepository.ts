// import { ResultSetHeader } from 'mysql2';
import mysql, { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from '../../shared/config/database';
import { Reservation, ReservationSumary } from '../models/Reservation';
import { PackageTypeSupplies } from '../models/PackageTypeSupplies';

export class ReservationRepository {

  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
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

  public static async createReservationWithSupplies(reservation: Reservation): Promise<Reservation> {
    const createReservationQuery = `
      INSERT INTO reservation (
        salon_id_fk, client_id_fk, package_type_id_fk, guest_amount, event_date, event_type, 
        created_at, created_by, updated_at, updated_by, deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  
    const getSuppliesQuery = `
      SELECT supplies_id_fk, supplies_quantity 
      FROM package_type_supplies 
      WHERE package_type_id_fk = ?;
    `;
  
    const insertReservationSuppliesQuery = `
      INSERT INTO package_type_supplies (
        package_type_id_fk, supplies_id_fk, supplies_quantity
      ) VALUES (?, ?, ?);
    `;
  
    const connection = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      namedPlaceholders: true,
      authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
      },
      connectionLimit: 10,
    }).getConnection();
  
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
  
      // Get the supplies for the package type
      const [supplies] = await connection.execute<RowDataPacket[]>(getSuppliesQuery, [reservation.package_type_id_fk]);
  
      // Insert the supplies into the reservation_supplies table
      for (const supply of supplies as PackageTypeSupplies[]) {
        await connection.execute(insertReservationSuppliesQuery, [
          createdReservationId, supply.supplies_id_fk, supply.supplies_quantity
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
