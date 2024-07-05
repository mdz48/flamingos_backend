import { Router } from 'express';
import { getMobiliaries, getMobiliaryById, createMobiliary, updateMobiliary, deleteMobiliary } from '../controllers/mobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const mobiliaryRoutes: Router = Router();

mobiliaryRoutes.get('/', authMiddleware, getMobiliaries);
mobiliaryRoutes.get('/:mobiliary_id', authMiddleware, getMobiliaryById);
mobiliaryRoutes.post('/', authMiddleware, createMobiliary);
mobiliaryRoutes.put('/:mobiliary_id', authMiddleware, updateMobiliary);
mobiliaryRoutes.delete('/:mobiliary_id', authMiddleware, deleteMobiliary);

export default mobiliaryRoutes;
