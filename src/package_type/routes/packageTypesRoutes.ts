import { Router } from 'express';
import { getPackageTypes, getPackageTypeById, createPackageType, updatePackageType, deletePackageType, getPackageTypeByIdSummaries, getPackageTypesSummaries } from '../controllers/packageTypesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const packageTypeRoutes: Router = Router();

packageTypeRoutes.get('/', getPackageTypes);
packageTypeRoutes.get('/summaries', getPackageTypesSummaries);
packageTypeRoutes.get('/:package_type_id/summaries', getPackageTypeByIdSummaries);
packageTypeRoutes.get('/:package_type_id', getPackageTypeById);
packageTypeRoutes.post('/', createPackageType);
packageTypeRoutes.put('/:package_type_id', updatePackageType);
packageTypeRoutes.delete('/:package_type_id', deletePackageType);

export default packageTypeRoutes;
