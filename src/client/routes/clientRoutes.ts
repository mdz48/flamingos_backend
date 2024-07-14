import { Router } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient, getClientSummaries} from '../controllers/clientController';
import { authMiddleware } from '../../shared/middlewares/auth';

const clientRoutes: Router = Router();

clientRoutes.get('/', authMiddleware, getClients);
clientRoutes.get('/summaries', authMiddleware, getClientSummaries);
clientRoutes.get('/:client_id', authMiddleware, getClientById);
clientRoutes.post('/', authMiddleware, createClient);
clientRoutes.put('/:client_id', authMiddleware, updateClient);
clientRoutes.delete('/:client_id', authMiddleware, deleteClient);

export default clientRoutes;
