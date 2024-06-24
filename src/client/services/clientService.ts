import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../models/Client";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ClientService {

    public static async getAllClients(): Promise<Client[]> {
        try {
            return await ClientRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener clientes: ${error.message}`);
        }
    }

    public static async getClientById(clientId: number): Promise<Client | null> {
        try {
            return await ClientRepository.findById(clientId);
        } catch (error: any) {
            throw new Error(`Error al encontrar cliente: ${error.message}`);
        }
    }

    public static async addClient(client: Client) {
        try {
            client.created_at = DateUtils.formatDate(new Date());
            client.updated_at = DateUtils.formatDate(new Date());
            return await ClientRepository.createClient(client);
        } catch (error: any) {
            throw new Error(`Error al crear cliente: ${error.message}`);
        }
    }

    public static async modifyClient(clientId: number, clientData: Client) {
        try {
            const clientFound = await ClientRepository.findById(clientId);
            if (clientFound) {
                if (clientData.name) {
                    clientFound.name = clientData.name;
                }
                if (clientData.cellphone) {
                    clientFound.cellphone = clientData.cellphone;
                }
                if (clientData.deleted !== undefined) {
                    clientFound.deleted = clientData.deleted;
                }
            } else {
                return null;
            }
            clientFound.updated_by = clientData.updated_by;
            clientFound.updated_at = DateUtils.formatDate(new Date());
            return await ClientRepository.updateClient(clientId, clientFound);
        } catch (error: any) {
            throw new Error(`Error al modificar cliente: ${error.message}`);
        }
    }

    public static async deleteClient(clientId: number): Promise<boolean> {
        try {
            return await ClientRepository.deleteClient(clientId);
        } catch (error: any) {
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }
}
