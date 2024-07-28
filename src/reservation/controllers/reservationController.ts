import { Request, Response } from 'express';
import { ReservationService } from '../services/reservationService';
import { Reservation, ReservationSumary } from '../models/Reservation';

export const getReservations = async (_req: Request, res: Response) => {
    try {
        const reservations = await ReservationService.getAllReservations();
        if (reservations.length > 0) {
            res.status(200).json(reservations);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getReservationSummaries = async (_req: Request, res: Response) => {
    try {
        const summaries = await ReservationService.getAllReservationSummaries();
        if (summaries.length > 0) {
            res.status(200).json(summaries);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getReservationById = async (req: Request, res: Response) => {
    try {
        const reservation_id = parseInt(req.params.reservation_id, 10);
        const reservation = await ReservationService.getReservationById(reservation_id);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: 'No se encontró la reservación' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getReservationByIdSummary = async (req: Request, res: Response) => {
    try {
        const reservation_id = parseInt(req.params.reservation_id, 10);
        const summary = await ReservationService.getReservationByIdSummary(reservation_id);
        if (summary) {
            res.status(200).json(summary);
        } else {
            res.status(404).json({ message: 'No se encontró la reservación' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const createReservation = async (req: Request, res: Response) => {
    try {
        const newReservation: Reservation = req.body;
        const result = await ReservationService.addReservation(newReservation);

        if ('error' in result) {
            res.status(409).json({ message: result.error });
        } else {
            res.status(201).json(result);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const reservation_id = parseInt(req.params.reservation_id, 10);
        const reservationData: Reservation = req.body;
        const result = await ReservationService.modifyReservation(reservation_id, reservationData);

        if (result === null) {
            res.status(404).json({ message: 'No se encontró la reservación o está deshabilitada' });
        } else if ('error' in result) {
            res.status(409).json({ message: result.error });
        } else {
            res.status(200).json(result);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    try {
        const reservation_id = parseInt(req.params.reservation_id, 10);
        const deleted = await ReservationService.deleteReservation(reservation_id);
        if (deleted) {
            res.status(200).json({ message: 'Se eliminó la reservación.' });
        } else {
            res.status(404).json({ message: 'No se encontró la reservación o está deshabilitada' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
