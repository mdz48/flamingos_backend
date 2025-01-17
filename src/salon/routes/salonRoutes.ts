import { Router } from 'express';
import { getSalons, getSalonById, createSalon, updateSalon, deleteSalon, getSalonByIdSummaries, getSalonsSummaries } from '../controllers/salonController';
import { authMiddleware } from '../../shared/middlewares/auth';

const salonRoutes: Router = Router();

salonRoutes.get('/', authMiddleware, getSalons);
salonRoutes.get('/summaries', authMiddleware, getSalonsSummaries);
salonRoutes.get('/:salon_id/summaries', authMiddleware, getSalonByIdSummaries);
salonRoutes.get('/:salon_id', authMiddleware, getSalonById);
salonRoutes.post('/',authMiddleware, createSalon);
salonRoutes.put('/:salon_id', authMiddleware, updateSalon);
salonRoutes.delete('/:salon_id', authMiddleware, deleteSalon);

export default salonRoutes;
