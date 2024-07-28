import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../shared/config/types/userPayLoad';
const secretKey = process.env.SECRET || "";

export const login = async (req: Request, res: Response) => {
    try {
        const { mail, password } = req.body;
        const token = await UserService.login(mail, password);
        if (token) {
            const  user = jwt.verify(token, secretKey) as UserPayload;
            res.setHeader('Authorization', token);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.status(200).json({ token, user });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserSummaries = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsersSummaries();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByMail = async (req: Request, res: Response) => {
    const { mail } = req.params;
    try {
        const user = await UserService.getUserByMail(mail);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: `Error al obtener usuario: ${error.message}` });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserById(parseInt(req.params.user_id, 10));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByIdSummary = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserByIdSummary(parseInt(req.params.user_id, 10));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.addUser(req.body);
        if ('error' in result) {
            res.status(409).json({ message: result.error });
        } else {
            res.status(201).json(result);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const result = await UserService.modifyUser(userId, req.body);
        if (result === null) {
            res.status(404).json({ message: 'No se encontró el usuario o está deshabilitado' });
        } else if ('error' in result) {
            res.status(409).json({ message: result.error });
        } else {
            res.status(200).json(result);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleted = await UserService.deleteUser(parseInt(req.params.user_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
