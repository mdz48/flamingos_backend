import { Router } from 'express';
import { getSupplies, getSuppliesById, createSupplies, updateSupplies, deleteSupplies, getSuppliesByIdSummary, getSuppliesSummary} from '../controllers/suppliesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const suppliesRoutes: Router = Router();

suppliesRoutes.get('/', authMiddleware, getSupplies);
suppliesRoutes.get('/summaries', authMiddleware, getSuppliesSummary);
suppliesRoutes.get('/:supplies_id', authMiddleware, getSuppliesById);
suppliesRoutes.get('/:supplies_id/summaries', authMiddleware, getSuppliesByIdSummary);
suppliesRoutes.post('/', authMiddleware, createSupplies);
suppliesRoutes.put('/:supplies_id', authMiddleware, updateSupplies);
suppliesRoutes.delete('/:supplies_id', authMiddleware, deleteSupplies);

export default suppliesRoutes;
