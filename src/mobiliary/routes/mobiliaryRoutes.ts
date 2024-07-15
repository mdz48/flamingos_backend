import { Router } from 'express';
import { getMobiliaries, getMobiliaryById, createMobiliary, updateMobiliary, deleteMobiliary, getMobiliarySummaries, getMobiliaryByIdSummaries} from '../controllers/mobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const mobiliaryRoutes: Router = Router();

mobiliaryRoutes.get('/', getMobiliaries);
mobiliaryRoutes.get('/summaries', getMobiliarySummaries);
mobiliaryRoutes.get('/:mobiliary_id',  getMobiliaryById);
mobiliaryRoutes.get('/:mobiliary_id/summaries', getMobiliaryByIdSummaries);
mobiliaryRoutes.post('/',  createMobiliary);
mobiliaryRoutes.put('/:mobiliary_id', updateMobiliary);
mobiliaryRoutes.delete('/:mobiliary_id',  deleteMobiliary);

export default mobiliaryRoutes;
