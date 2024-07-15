import { Request, Response } from 'express';
import { PackageTypeService } from '../services/packageTypeService';
import { PackageType } from '../models/PackageType';

export const getPackageTypes = async (_req: Request, res: Response) => {
  try {
    const packageTypes = await PackageTypeService.getAllPackageTypes();
    if (packageTypes) {
      res.status(200).json(packageTypes);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackageTypesSummaries = async (_req: Request, res: Response) => {
  try {
    const packageTypes = await PackageTypeService.getAllPackageTypeSummaries();
    if (packageTypes) {
      res.status(200).json(packageTypes);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackageTypeById = async (req: Request, res: Response) => {
  try {
    const packageType = await PackageTypeService.getPackageTypeById(parseInt(req.params.package_type_id, 10));
    if (packageType) {
      res.status(200).json(packageType);
    } else {
      res.status(404).json({ message: 'No se encontró el tipo de paquete' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackageTypeByIdSummaries = async (req: Request, res: Response) => {
  try {
    const packageType = await PackageTypeService.getPackageTypeByIdSummary(parseInt(req.params.package_type_id, 10));
    if (packageType) {
      res.status(200).json(packageType);
    } else {
      res.status(404).json({ message: 'No se encontró el tipo de paquete' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPackageType = async (req: Request, res: Response) => {
  try {
    const newPackageType = await PackageTypeService.addPackageType(req.body as PackageType);
    if (newPackageType) {
      res.status(201).json(newPackageType);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePackageType = async (req: Request, res: Response) => {
  try {
    const updatedPackageType = await PackageTypeService.modifyPackageType(parseInt(req.params.package_type_id, 10), req.body as PackageType);
    if (updatedPackageType) {
      res.status(200).json(updatedPackageType);
    } else {
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePackageType = async (req: Request, res: Response) => {
  try {
    const deleted = await PackageTypeService.deletePackageType(parseInt(req.params.package_type_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Se eliminó el tipo de paquete.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
