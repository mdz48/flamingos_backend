import { ClientRepository } from '../repositories/ClientRepository';
import { Client } from '../models/Client';
import { DateUtils } from '../../shared/utils/DateUtils';
import { ClientSummary } from '../models/ClientSummary';

export class ClientService {

  public static async getAllClients(): Promise<Client[]> {
    try {
      return await ClientRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener clientes: ${error.message}`);
    }
  }

  public static async getAllClientSummaries(): Promise<ClientSummary[]> {
    try {
      return await ClientRepository.findAllSummaries();
    } catch (error: any) {
      throw new Error(`Error al obtener resúmenes de clientes: ${error.message}`);
    }
  }

  public static async getClientById(client_id: number): Promise<Client | null> {
    try {
      return await ClientRepository.findById(client_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar cliente: ${error.message}`);
    }
  }

  public static async addClient(client: Client) {
    try {
      client.created_at = DateUtils.formatDate(new Date());
      client.updated_at = DateUtils.formatDate(new Date());
      client.deleted = false; 
      return await ClientRepository.createClient(client);
    } catch (error: any) {
      throw new Error(`Error al crear cliente: ${error.message}`);
    }
  }

  public static async modifyClient(client_id: number, clientData: Client): Promise<Client | null> {
    try {
      const clientFound = await ClientRepository.findById(client_id);
      if (clientFound) {
        clientFound.firstname = clientData.firstname || clientFound.firstname;
        clientFound.lastname = clientData.lastname || clientFound.lastname;
        clientFound.cellphone = clientData.cellphone || clientFound.cellphone;
        clientFound.updated_at = DateUtils.formatDate(new Date());
        clientFound.updated_by = clientData.updated_by || clientFound.updated_by;
        clientFound.deleted = clientData.deleted !== undefined ? clientData.deleted : clientFound.deleted;
        return await ClientRepository.updateClient(client_id, clientFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar cliente: ${error.message}`);
    }
  }

  public static async deleteClient(client_id: number): Promise<boolean> {
    try {
      return await ClientRepository.deleteClient(client_id);
    } catch (error: any) {
      throw new Error(`Error al eliminar cliente: ${error.message}`);
    }
  }
}
