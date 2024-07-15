import { Router } from 'express';
import { getSalons, getSalonById, createSalon, updateSalon, deleteSalon, getSalonByIdSummaries, getSalonsSummaries } from '../controllers/salonController';
import { authMiddleware } from '../../shared/middlewares/auth';

const salonRoutes: Router = Router();

salonRoutes.get('/', getSalons);
salonRoutes.get('/summaries', getSalonsSummaries);
salonRoutes.get('/:salon_id/summaries', getSalonByIdSummaries);
salonRoutes.get('/:salon_id', getSalonById);
salonRoutes.post('/', createSalon);
salonRoutes.put('/:salon_id', updateSalon);
salonRoutes.delete('/:salon_id', deleteSalon);

export default salonRoutes;
