import express from 'express';
import { login } from '../controllers/loginController';

const loginRoutes = express.Router();

loginRoutes.post('/', login);

export default loginRoutes;
