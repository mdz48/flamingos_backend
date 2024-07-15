import { Router } from 'express';
import { login, getUsers, getUserById, createUser, updateUser, deleteUser, getUserByIdSummary, getUserSummaries } from '../controllers/userController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', login);
userRoutes.get('/', getUsers);
userRoutes.get('/summaries', getUserSummaries);
userRoutes.get('/:user_id', getUserById);
userRoutes.get('/:user_id/summaries', getUserByIdSummary);
userRoutes.post('/', createUser);
userRoutes.put('/:user_id', updateUser);
userRoutes.delete('/:user_id', deleteUser);

export default userRoutes;
