import { Request, Response } from 'express';
import { RentedMobiliaryService } from '../services/rentedMobiliaryService';

export const getRentedMobiliary = async (_req: Request, res: Response) => {
  try {
    const rentedMobiliary = await RentedMobiliaryService.getAllRentedMobiliary();
    if (rentedMobiliary) {
      res.status(200).json(rentedMobiliary);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRentedMobiliaryById = async (req: Request, res: Response) => {
  try {
    const rentedMobiliary = await RentedMobiliaryService.getRentedMobiliaryById(parseInt(req.params.id));
    if (rentedMobiliary) {
      res.status(200).json(rentedMobiliary);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRentedMobiliary = async (req: Request, res: Response) => {
  try {
    const rentedMobiliary = await RentedMobiliaryService.addRentedMobiliary(req.body);
    res.status(201).json(rentedMobiliary);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRentedMobiliary = async (req: Request, res: Response) => {
  try {
    const rentedMobiliary = await RentedMobiliaryService.modifyRentedMobiliary(parseInt(req.params.id), req.body);
    if (rentedMobiliary) {
      res.status(200).json(rentedMobiliary);
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRentedMobiliary = async (req: Request, res: Response) => {
  try {
    const success = await RentedMobiliaryService.deleteRentedMobiliary(parseInt(req.params.id));
    if (success) {
      res.status(200).json({ message: 'Registro eliminado' });
    } else {
      res.status(404).json({ message: 'Registro no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
