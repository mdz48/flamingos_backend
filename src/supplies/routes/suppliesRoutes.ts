import { Router } from 'express';
import { getSupplies, getSuppliesById, createSupplies, updateSupplies, deleteSupplies, getSuppliesByIdSummary, getSuppliesSummary} from '../controllers/suppliesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const suppliesRoutes: Router = Router();

suppliesRoutes.get('/', getSupplies);
suppliesRoutes.get('/summaries', getSuppliesSummary);
suppliesRoutes.get('/:supplies_id', getSuppliesById);
suppliesRoutes.get('/:supplies_id/summaries', getSuppliesByIdSummary);
suppliesRoutes.post('/', createSupplies);
suppliesRoutes.put('/:supplies_id', updateSupplies);
suppliesRoutes.delete('/:supplies_id', deleteSupplies);

export default suppliesRoutes;
