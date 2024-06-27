import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const rawUserRoutes: Router = Router();

rawUserRoutes.get('/', getUsers);
rawUserRoutes.get('/:iduser', getUserById);
rawUserRoutes.post('/', createUser);
rawUserRoutes.put('/:iduser', updateUser);
rawUserRoutes.delete('/:iduser', deleteUser);

export default rawUserRoutes;