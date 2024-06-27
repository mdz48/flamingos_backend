import { Router } from 'express';
import { getSupplies, getSuppliesById, createSupplies, updateSupplies, deleteSupplies } from '../controllers/suppliesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const suppliesRoutes: Router = Router();

suppliesRoutes.get('/', getSupplies);
suppliesRoutes.get('/:supplies_id', authMiddleware, getSuppliesById);
suppliesRoutes.post('/', authMiddleware, createSupplies);
suppliesRoutes.put('/:supplies_id', authMiddleware, updateSupplies);
suppliesRoutes.delete('/:supplies_id', authMiddleware, deleteSupplies);

export default suppliesRoutes;
