import { Request, Response } from 'express';
import { SuppliesService } from '../services/suppliesService';

export const getSupplies = async (_req: Request, res: Response) => {
    try {
        const supplies = await SuppliesService.getAllSupplies();
        if (supplies) {
            res.status(200).json(supplies);
        } else {
            res.status(404).json({ message: 'Sin registros' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getSuppliesById = async (req: Request, res: Response) => {
    try {
        const supplies = await SuppliesService.getSuppliesById(parseInt(req.params.supplies_id, 10));
        if (supplies) {
            res.status(200).json(supplies);
        } else {
            res.status(404).json({ message: 'No se encontró el suministro' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createSupplies = async (req: Request, res: Response) => {
    try {
        const newSupplies = await SuppliesService.addSupplies(req.body);
        if (newSupplies) {
            res.status(201).json(newSupplies);
        } else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSupplies = async (req: Request, res: Response) => {
    try {
        const updatedSupplies = await SuppliesService.modifySupplies(parseInt(req.params.supplies_id, 10), req.body);
        if (updatedSupplies) {
            res.status(200).json(updatedSupplies);
        } else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSupplies = async (req: Request, res: Response) => {
    try {
        const deleted = await SuppliesService.deleteSupplies(parseInt(req.params.supplies_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Suministro eliminado' });
        } else {
            res.status(404).json({ message: 'No se encontró el suministro' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
