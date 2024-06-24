import { Router } from 'express';
import { getMobiliaries, getMobiliaryById, createMobiliary, updateMobiliary, deleteMobiliary } from '../controllers/mobiliaryController';

const mobiliaryRoutes: Router = Router();

mobiliaryRoutes.get('/', getMobiliaries);
mobiliaryRoutes.get('/:mobiliary_id', getMobiliaryById);
mobiliaryRoutes.post('/', createMobiliary);
mobiliaryRoutes.put('/:mobiliary_id', updateMobiliary);
mobiliaryRoutes.delete('/:mobiliary_id', deleteMobiliary);

export default mobiliaryRoutes;
