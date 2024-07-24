import { ReservationRepository } from '../repositories/ReservationRepository';
import { Reservation, ReservationSumary } from '../models/Reservation';
import { DateUtils } from '../../shared/utils/DateUtils';

export class ReservationService {

  public static async getAllReservations(): Promise<Reservation[]> {
    try {
      return await ReservationRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener las reservaciones: ${error.message}`);
    }
  }

  public static async getReservationById(reservation_id: number): Promise<Reservation | null> {
    try {
      return await ReservationRepository.findById(reservation_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar la reservación: ${error.message}`);
    }
  }

  public static async getAllReservationSummaries(): Promise<ReservationSumary[]> {
    try {
      const summaries = await ReservationRepository.findAllSummaries();
      // Formatear las fechas en cada resumen antes de devolver
      return summaries.map(summary => ({
        ...summary,
        event_date: DateUtils.formatDateOnly(new Date(summary.event_date)),
      }));
    } catch (error: any) {
      throw new Error(`Error al obtener los resúmenes de reservaciones: ${error.message}`);
    }
  }

  public static async getReservationByIdSummary(reservation_id: number): Promise<ReservationSumary | null> {
    try {
      return await ReservationRepository.findByIdSummary(reservation_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar el resumen de la reservación: ${error.message}`);
    }
  }

  public static async addReservation(reservation: Reservation): Promise<Reservation | { message: string } > {
    try {
      reservation.created_at = DateUtils.formatDate(new Date());
      reservation.updated_at = DateUtils.formatDate(new Date());
      reservation.deleted = false;
      return await ReservationRepository.addReservation(reservation);
    } catch (error: any) {
      throw new Error(`Error al crear la reservación: ${error.message}`);
    }
  }

  public static async modifyReservation(reservation_id: number, reservationData: Reservation): Promise<Reservation | null> {
    try {
      const reservationFound = await ReservationRepository.findById(reservation_id);
      if (reservationFound) {
        if (reservationFound.deleted && reservationData.deleted) {
          throw new Error('Este registro está deshabilitado, habilítelo para actualizarlo');
        }
        reservationFound.salon_id_fk = reservationData.salon_id_fk || reservationFound.salon_id_fk;
        reservationFound.client_id_fk = reservationData.client_id_fk || reservationFound.client_id_fk;
        reservationFound.package_type_id_fk = reservationData.package_type_id_fk || reservationFound.package_type_id_fk;
        reservationFound.guest_amount = reservationData.guest_amount || reservationFound.guest_amount;
        reservationFound.event_date = reservationData.event_date || reservationFound.event_date;
        reservationFound.event_type = reservationData.event_type || reservationFound.event_type;
        reservationFound.updated_by = reservationData.updated_by;
        reservationFound.updated_at = DateUtils.formatDate(new Date());
        return await ReservationRepository.updateReservation(reservation_id, reservationFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar la reservación: ${error.message}`);
    }
  }

  public static async deleteReservation(reservation_id: number): Promise<boolean> {
    try {
      return await ReservationRepository.deleteReservation(reservation_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar la reservación: ${error.message}`);
    }
  }

}
