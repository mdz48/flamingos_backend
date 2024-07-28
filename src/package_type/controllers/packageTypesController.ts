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

export const getPibot = async (_req: Request, res: Response) => {
  try {
    const packageTypes = await PackageTypeService.getAllPibotData();
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
    const pibotData = await PackageTypeService.getPibotByPackageId(parseInt(req.params.package_type_id, 10));

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
    const { relationship } = req.body;
    const newPackageType = await PackageTypeService.addPackageType(req.body as PackageType);
    const createdRelationship = await PackageTypeService.addPibotData(relationship, newPackageType.package_type_id)
    if (newPackageType && createdRelationship) {
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
    const { relationship, ...packageTypeData } = req.body;
    const updatedPackageType = await PackageTypeService.modifyPackageType(parseInt(req.params.package_type_id, 10), req.body as PackageType);
    const updatedRelationship = await PackageTypeService.addPibotData(relationship, parseInt(req.params.package_type_id, 10));
    if (updatedRelationship) {
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
      res.status(404).json({ message: 'No se encontró el paquete' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
