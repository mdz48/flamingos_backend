import { Request, Response } from 'express';
import { ReservationService } from '../services/reservationService';

export const getReservations = async (_req: Request, res: Response) => {
    try {
        const reservations = await ReservationService.getAllReservations();
        if (reservations) {
            res.status(200).json(reservations);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getReservationById = async (req: Request, res: Response) => {
    try {
        const reservation = await ReservationService.getReservationById(parseInt(req.params.reservation_id, 10));
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: 'No se encontró la reservación' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createReservation = async (req: Request, res: Response) => {
    try {
        const newReservation = await ReservationService.addReservation(req.body);
        if (newReservation) {
            res.status(201).json(newReservation);
        } else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const updatedReservation = await ReservationService.modifyReservation(parseInt(req.params.reservation_id, 10), req.body);
        if (updatedReservation) {
            res.status(200).json(updatedReservation);
        } else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    try {
        const deleted = await ReservationService.deleteReservation(parseInt(req.params.reservation_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Reservación eliminada' });
        } else {
            res.status(404).json({ message: 'No se encontró la reservación' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
