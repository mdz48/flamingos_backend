import { Router } from 'express';
import { getPackageTypes, getPackageTypeById, createPackageType, updatePackageType, deletePackageType, getPackageTypeByIdSummaries, getPackageTypesSummaries, getPibot } from '../controllers/packageTypesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const packageTypeRoutes: Router = Router();

packageTypeRoutes.get('/', authMiddleware,  getPackageTypes);
packageTypeRoutes.get('/pibot', authMiddleware,  getPibot);
packageTypeRoutes.get('/summaries',authMiddleware,  getPackageTypesSummaries);
packageTypeRoutes.get('/:package_type_id/summaries',authMiddleware,  getPackageTypeByIdSummaries);
packageTypeRoutes.get('/:package_type_id', authMiddleware, getPackageTypeById);
packageTypeRoutes.post('/', authMiddleware, createPackageType);
packageTypeRoutes.put('/:package_type_id', authMiddleware, updatePackageType);
packageTypeRoutes.delete('/:package_type_id', authMiddleware, deletePackageType);

export default packageTypeRoutes;
