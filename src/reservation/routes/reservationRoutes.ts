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

reservationRoutes.get('/', getReservations);
reservationRoutes.get('/summaries', getReservationSummaries);
reservationRoutes.get('/:reservation_id/summary', getReservationByIdSummary);
reservationRoutes.get('/:reservation_id', getReservationById);
reservationRoutes.post('/', createReservation);
reservationRoutes.put('/:reservation_id', updateReservation);
reservationRoutes.delete('/:reservation_id', deleteReservation);

export default reservationRoutes;
