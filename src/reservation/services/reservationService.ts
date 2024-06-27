import { ReservationRepository } from "../repositories/ReservationRepository";
import { Reservation } from "../models/Reservation";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ReservationService {

    public static async getAllReservations(): Promise<Reservation[]> {
        try {
            return await ReservationRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener reservaciones: ${error.message}`);
        }
    }

    public static async getReservationById(reservationId: number): Promise<Reservation | null> {
        try {
            return await ReservationRepository.findById(reservationId);
        } catch (error: any) {
            throw new Error(`Error al encontrar reservación: ${error.message}`);
        }
    }

    public static async addReservation(reservation: Reservation) {
        try {
            reservation.created_at = DateUtils.formatDate(new Date());
            reservation.updated_at = DateUtils.formatDate(new Date());
            return await ReservationRepository.createReservation(reservation);
        } catch (error: any) {
            throw new Error(`Error al crear reservación: ${error.message}`);
        }
    }

    public static async modifyReservation(reservationId: number, reservationData: Reservation) {
        try {
            const reservationFound = await ReservationRepository.findById(reservationId);
            if (reservationFound) {
                reservationFound.salon_id_fk = reservationData.salon_id_fk || reservationFound.salon_id_fk;
                reservationFound.user_id_fk = reservationData.user_id_fk || reservationFound.user_id_fk;
                reservationFound.mobiliary_id_fk = reservationData.mobiliary_id_fk || reservationFound.mobiliary_id_fk;
                reservationFound.supplies_id_fk = reservationData.supplies_id_fk || reservationFound.supplies_id_fk;
                reservationFound.deleted = reservationData.deleted !== undefined ? reservationData.deleted : reservationFound.deleted;
            } else {
                return null;
            }
            reservationFound.updated_by = reservationData.updated_by;
            reservationFound.updated_at = DateUtils.formatDate(new Date());
            return await ReservationRepository.updateReservation(reservationId, reservationFound);
        } catch (error: any) {
            throw new Error(`Error al modificar reservación: ${error.message}`);
        }
    }

    public static async deleteReservation(reservationId: number): Promise<boolean> {
        try {
            return await ReservationRepository.deleteReservation(reservationId);
        } catch (error: any) {
            throw new Error(`Error al eliminar reservación: ${error.message}`);
        }
    }
}
