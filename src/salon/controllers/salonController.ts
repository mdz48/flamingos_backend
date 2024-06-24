import { Request, Response } from 'express';
import { salonService } from '../services/salonService';

export const getSalons = async (_req: Request, res: Response) => {
  try {
    const salons = await salonService.getAllSalons();
    if (salons) {
      res.status(200).json(salons);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalonById = async (req: Request, res: Response) => {
  try {
    const salon = await salonService.getSalonById(parseInt(req.params.salon_id, 10));
    if (salon) {
      res.status(200).json(salon);
    } else {
      res.status(404).json({ message: 'No se encontró el salón' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSalon = async (req: Request, res: Response) => {
  try {
    const newSalon = await salonService.addSalon(req.body);
    if (newSalon) {
      res.status(201).json(newSalon);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSalon = async (req: Request, res: Response) => {
  try {
    const updatedSalon = await salonService.modifySalon(parseInt(req.params.salon_id, 10), req.body);
    if (updatedSalon) {
      res.status(200).json(updatedSalon);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSalon = async (req: Request, res: Response) => {
  try {
    const deleted = await salonService.deleteSalon(parseInt(req.params.salon_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el salón.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
