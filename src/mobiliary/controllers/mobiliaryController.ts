import { Request, Response } from 'express';
import { MobiliaryService } from '../services/mobiliaryService';

export const getMobiliaries = async (_req: Request, res: Response) => {
  try {
    const mobiliaries = await MobiliaryService.getAllMobiliaries();
    if (mobiliaries) {
      res.status(201).json(mobiliaries);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMobiliarySummaries = async (_req: Request, res: Response) => {
  try {
    const mobiliarySummaries = await MobiliaryService.getAllMobiliarySummaries();
    if (mobiliarySummaries) {
      res.status(200).json(mobiliarySummaries);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMobiliaryById = async (req: Request, res: Response) => {
  try {
    const mobiliary = await MobiliaryService.getMobiliaryById(parseInt(req.params.mobiliary_id, 10));
    if (mobiliary) {
      res.status(201).json(mobiliary);
    } else {
      res.status(404).json({ message: 'No se encontró el mobiliario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMobiliaryByIdSummaries = async (req: Request, res: Response) => {
  try {
    const mobiliary = await MobiliaryService.getMobiliaryByIdSummaries(parseInt(req.params.mobiliary_id, 10));
    if (mobiliary) {
      res.status(201).json(mobiliary);
    } else {
      res.status(404).json({ message: 'No se encontró el mobiliario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createMobiliary = async (req: Request, res: Response) => {
  try {
    const newMobiliary = await MobiliaryService.addMobiliary(req.body);
    if (newMobiliary) {
      res.status(201).json(newMobiliary);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMobiliary = async (req: Request, res: Response) => {
  try {
    const updatedMobiliary = await MobiliaryService.modifyMobiliary(parseInt(req.params.mobiliary_id, 10), req.body);
    if (updatedMobiliary) {
      res.status(201).json(updatedMobiliary);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMobiliary = async (req: Request, res: Response) => {
  try {
    const deleted = await MobiliaryService.deleteMobiliary(parseInt(req.params.mobiliary_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Mobiliario eliminado' });
    } else {
      res.status(404).json({ message: 'No se encontró el mobiliario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
