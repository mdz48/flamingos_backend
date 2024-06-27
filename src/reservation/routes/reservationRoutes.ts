import { Router } from 'express';
import { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } from '../controllers/reservationController';
import { authMiddleware } from '../../shared/middlewares/auth';

const reservationRoutes: Router = Router();

reservationRoutes.get('/', getReservations);
reservationRoutes.get('/:reservation_id', authMiddleware, getReservationById);
reservationRoutes.post('/', authMiddleware, createReservation);
reservationRoutes.put('/:reservation_id', authMiddleware, updateReservation);
reservationRoutes.delete('/:reservation_id', authMiddleware, deleteReservation);

export default reservationRoutes;