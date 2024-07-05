import { Router } from 'express';
import { loginUser, getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware, getUsers);

userRoutes.get('/:user_id', authMiddleware, getUserById);

userRoutes.post('/', authMiddleware,  createUser);

userRoutes.put('/:user_id', authMiddleware, updateUser);

userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
