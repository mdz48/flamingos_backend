import { Router } from 'express';
import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/reservationController';

const reservationRoutes: Router = Router();

reservationRoutes.get('/', getReservations);
reservationRoutes.get('/:reservation_id', getReservationById);
reservationRoutes.post('/', createReservation);
reservationRoutes.put('/:reservation_id', updateReservation);
reservationRoutes.delete('/:reservation_id', deleteReservation);

export default reservationRoutes;