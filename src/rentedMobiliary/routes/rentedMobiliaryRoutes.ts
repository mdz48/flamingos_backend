import { Router } from 'express';
import { getRentedMobiliary, getRentedMobiliaryById, createRentedMobiliary, updateRentedMobiliary, deleteRentedMobiliary, getRentedMobiliaryByIdSummaries, getRentedMobiliarySummaries} from '../controllers/rentedMobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rentedMobiliaryRoutes: Router = Router();

rentedMobiliaryRoutes.get('/', authMiddleware, getRentedMobiliary);
rentedMobiliaryRoutes.get('/summaries', authMiddleware, getRentedMobiliarySummaries);
rentedMobiliaryRoutes.get('/:rented_mobiliary_id', authMiddleware, getRentedMobiliaryById);
rentedMobiliaryRoutes.get('/:rented_mobiliary_id/summaries', authMiddleware, getRentedMobiliaryByIdSummaries);
rentedMobiliaryRoutes.post('/', authMiddleware, createRentedMobiliary);
rentedMobiliaryRoutes.put('/:rented_mobiliary_id', authMiddleware, updateRentedMobiliary);
rentedMobiliaryRoutes.delete('/:rented_mobiliary_id', authMiddleware, deleteRentedMobiliary);

export default rentedMobiliaryRoutes;