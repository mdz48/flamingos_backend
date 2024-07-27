import { Router } from 'express';
import {
  getReservations,
  getReservationSummaries,
  getReservationByIdSummary,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';
import { authMiddleware } from '../../shared/middlewares/auth';

const reservationRoutes: Router = Router();

reservationRoutes.get('/', authMiddleware, getReservations);
reservationRoutes.get('/summaries', authMiddleware, getReservationSummaries);
reservationRoutes.get('/:reservation_id/summary', authMiddleware, getReservationByIdSummary);
reservationRoutes.get('/:reservation_id', authMiddleware, getReservationById);
reservationRoutes.post('/', authMiddleware, createReservation);
reservationRoutes.put('/:reservation_id', authMiddleware, updateReservation);
reservationRoutes.delete('/:reservation_id', authMiddleware, deleteReservation);

export default reservationRoutes;
