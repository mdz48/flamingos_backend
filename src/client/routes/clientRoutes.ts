import { Router } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientController';

const clientRoutes: Router = Router();

clientRoutes.get('/', getClients);
clientRoutes.get('/:client_id', getClientById);
clientRoutes.post('/', createClient);
clientRoutes.put('/:client_id', updateClient);
clientRoutes.delete('/:client_id', deleteClient);

export default clientRoutes;
