import { Router } from 'express';
import { getRentedMobiliary, getRentedMobiliaryById, createRentedMobiliary, updateRentedMobiliary, deleteRentedMobiliary, getRentedMobiliaryByIdSummaries, getRentedMobiliarySummaries} from '../controllers/rentedMobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rentedMobiliaryRoutes: Router = Router();

rentedMobiliaryRoutes.get('/', getRentedMobiliary);
rentedMobiliaryRoutes.get('/summaries', getRentedMobiliarySummaries);
rentedMobiliaryRoutes.get('/:rented_mobiliary_id', getRentedMobiliaryById);
rentedMobiliaryRoutes.get('/:rented_mobiliary_id/summaries', getRentedMobiliaryByIdSummaries);
rentedMobiliaryRoutes.post('/', createRentedMobiliary);
rentedMobiliaryRoutes.put('/:rented_mobiliary_id', updateRentedMobiliary);
rentedMobiliaryRoutes.delete('/:rented_mobiliary_id', deleteRentedMobiliary);

export default rentedMobiliaryRoutes;