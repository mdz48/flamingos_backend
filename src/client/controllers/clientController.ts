import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await ClientService.getAllClients();
    if (clients) {
      res.status(201).json(clients);
    } else {
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientSummaries = async (_req: Request, res: Response) => {
  try {
      const clientSummaries = await ClientService.getAllClientSummaries();
      res.status(200).json(clientSummaries);
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await ClientService.getClientById(parseInt(req.params.client_id, 10));
    if (client) {
      res.status(201).json(client);
    } else {
      res.status(404).json({ message: 'No se encontró el cliente' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientByIdSummaries = async (req: Request, res: Response) => {
  try {
    const client = await ClientService.getClientByIdSummaries(parseInt(req.params.client_id, 10));
    if (client) {
      res.status(201).json(client);
    } else {
      res.status(404).json({ message: 'No se encontró el cliente' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = await ClientService.addClient(req.body);
    if (newClient) {
      res.status(201).json(newClient);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedClient = await ClientService.modifyClient(parseInt(req.params.client_id, 10), req.body);
    if (updatedClient) {
      res.status(201).json(updatedClient);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deleted = await ClientService.deleteClient(parseInt(req.params.client_id, 10));
    if (deleted) {
      res.status(201).json({ message: 'Se eliminó el cliente.' });
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
