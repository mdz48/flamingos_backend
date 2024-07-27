import { Router } from 'express';
import { getMobiliaries, getMobiliaryById, createMobiliary, updateMobiliary, deleteMobiliary, getMobiliarySummaries, getMobiliaryByIdSummaries} from '../controllers/mobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const mobiliaryRoutes: Router = Router();

mobiliaryRoutes.get('/',authMiddleware,  getMobiliaries);
mobiliaryRoutes.get('/summaries', authMiddleware, getMobiliarySummaries);
mobiliaryRoutes.get('/:mobiliary_id', authMiddleware,  getMobiliaryById);
mobiliaryRoutes.get('/:mobiliary_id/summaries', authMiddleware, getMobiliaryByIdSummaries);
mobiliaryRoutes.post('/', authMiddleware,  createMobiliary);
mobiliaryRoutes.put('/:mobiliary_id', authMiddleware, updateMobiliary);
mobiliaryRoutes.delete('/:mobiliary_id', authMiddleware,  deleteMobiliary);

export default mobiliaryRoutes;
