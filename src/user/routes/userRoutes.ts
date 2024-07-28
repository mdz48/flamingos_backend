import { Router } from 'express';
import { login, getUsers, getUserById, createUser, updateUser, deleteUser, getUserByIdSummary, getUserSummaries, getUserByMail } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', login);
userRoutes.get('/', authMiddleware, getUsers);
userRoutes.get('/summaries', authMiddleware, getUserSummaries);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.get('/:mail', authMiddleware, getUserByMail);
userRoutes.get('/:user_id/summaries', authMiddleware, getUserByIdSummary);
userRoutes.post('/', authMiddleware, createUser);
userRoutes.put('/:user_id', authMiddleware, updateUser);
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
