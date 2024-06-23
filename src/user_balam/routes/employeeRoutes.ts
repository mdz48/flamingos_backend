import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const userRoutes: Router = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:iduser', getUserById);
userRoutes.post('/', createUser);
userRoutes.put('/:iduser', updateUser);
userRoutes.delete('/:iduser', deleteUser);

export default userRoutes;