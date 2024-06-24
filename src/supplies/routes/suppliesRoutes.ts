import { Router } from 'express';
import { getSupplies, getSuppliesById, createSupplies, updateSupplies, deleteSupplies } from '../controllers/suppliesController';

const suppliesRoutes: Router = Router();

suppliesRoutes.get('/', getSupplies);
suppliesRoutes.get('/:supplies_id', getSuppliesById);
suppliesRoutes.post('/', createSupplies);
suppliesRoutes.put('/:supplies_id', updateSupplies);
suppliesRoutes.delete('/:supplies_id', deleteSupplies);

export default suppliesRoutes;
