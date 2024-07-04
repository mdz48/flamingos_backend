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
                reservationFound.client_id_fk = reservationData.client_id_fk || reservationFound.client_id_fk;
                reservationFound.mobiliary_id_fk = reservationData.mobiliary_id_fk || reservationFound.mobiliary_id_fk;
                reservationFound.guest_count = reservationData.guest_count || reservationFound.guest_count;
                reservationFound.package_type = reservationData.package_type || reservationFound.package_type;
                reservationFound.mobiliary_quantity = reservationData.mobiliary_quantity || reservationFound.mobiliary_quantity;
                reservationFound.food_type = reservationData.food_type || reservationFound.food_type;
                reservationFound.event_datetime = reservationData.event_datetime || reservationFound.event_datetime;
                reservationFound.event_type = reservationData.event_type || reservationFound.event_type;
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
