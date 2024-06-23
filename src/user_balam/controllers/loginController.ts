import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const login = async (req: Request, res: Response) => {
  const { name } = req.body;
  
  try {
    const user = await userService.getUserByName(name);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    return res.status(200).json({ message: 'Login exitoso', user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
