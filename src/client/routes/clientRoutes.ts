import { Router } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient, getClientSummaries, getClientByIdSummaries} from '../controllers/clientController';
import { authMiddleware } from '../../shared/middlewares/auth';

const clientRoutes: Router = Router();

clientRoutes.get('/',  getClients);
clientRoutes.get('/summaries',  getClientSummaries);
clientRoutes.get('/:client_id', getClientById);
clientRoutes.get('/:client_id/summaries', getClientByIdSummaries);
clientRoutes.post('/',  createClient);
clientRoutes.put('/:client_id', updateClient);
clientRoutes.delete('/:client_id', deleteClient);

export default clientRoutes;
