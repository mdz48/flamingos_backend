import { Router } from 'express';
import { getRentedMobiliary, getRentedMobiliaryById, createRentedMobiliary, updateRentedMobiliary, deleteRentedMobiliary } from '../controllers/rentedMobiliaryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rentedMobiliaryRoutes: Router = Router();

rentedMobiliaryRoutes.get('/', authMiddleware, getRentedMobiliary);
rentedMobiliaryRoutes.get('/:rentedMobiliary_id', authMiddleware, getRentedMobiliaryById);
rentedMobiliaryRoutes.post('/', authMiddleware, createRentedMobiliary);
rentedMobiliaryRoutes.put('/:rentedMobiliary_id', authMiddleware, updateRentedMobiliary);
rentedMobiliaryRoutes.delete('/:rentedMobiliary_id', authMiddleware, deleteRentedMobiliary);

export default rentedMobiliaryRoutes;