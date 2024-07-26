import { PackageTypeRepository } from "../repositories/PackageTypeRepository";
import { DateUtils } from "../../shared/utils/DateUtils";
import { PackageType, PackageTypeSummary, PibotData } from "../models/PackageType";

export class PackageTypeService {

    public static async getAllPackageTypes(): Promise<PackageType[]> {
        try {
            return await PackageTypeRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener los tipos de paquete: ${error.message}`);
        }
    }

    public static async getPackageTypeById(package_type_id: number): Promise<PackageType | null> {
        try {
            return await PackageTypeRepository.findById(package_type_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar tipo de paquete: ${error.message}`);
        }
    }

    public static async getAllPackageTypeSummaries(): Promise<PackageTypeSummary[]> {
        try {
            return await PackageTypeRepository.findAllSummaries();
        } catch (error: any) {
            throw new Error(`Error al obtener resúmenes de tipos de paquete: ${error.message}`);
        }
    }

    public static async getPackageTypeByIdSummary(package_type_id: number): Promise<PackageTypeSummary | null> {
        try {
            return await PackageTypeRepository.findByIdSummary(package_type_id);
        } catch (error: any) {
            throw new Error(`Error al encontrar resumen de tipo de paquete: ${error.message}`);
        }
    }

    public static async addPackageType(packageType: PackageType) {
        try {
            packageType.created_at = DateUtils.formatDate(new Date());
            packageType.updated_at = DateUtils.formatDate(new Date());
            if (!packageType.precreated) {
                packageType.precreated = false;     
            }
            packageType.deleted = false;
            return await PackageTypeRepository.createPackageType(packageType);
        } catch (error: any) {
            throw new Error(`Error al crear tipo de paquete: ${error.message}`);
        }
    }

    public static async addPibotData(relationship: Array<number>, package_type_id: number): Promise<PibotData[]> {
        try {
          const promises = relationship.map(supplies_id => {
            const pibotData: PibotData = {
              package_type_id_fk: package_type_id,
              supplies_id_fk: supplies_id
            };
            return PackageTypeRepository.createPibotData(pibotData);
          });
          const results = await Promise.all(promises);
          return results;
        } catch (error: any) {
          throw new Error(`Error al insertar los datos de la relación: ${error.message}`);
        }
      }

    public static async modifyPackageType(package_type_id: number, packageTypeData: PackageType){
        try{
            const packageTypeFound =  await PackageTypeRepository.findById(package_type_id);
            await PackageTypeRepository.deletePibotDataByPackageTypeId(package_type_id);
            if(packageTypeFound){
                if (packageTypeFound.deleted && packageTypeData.deleted != false) {
                    throw new Error("Este registro está deshabilitado, habilítalo para actualizarlo");
                }
                if(packageTypeFound.deleted){
                    packageTypeFound.deleted = packageTypeData.deleted;
                }
                if (packageTypeData.name) {
                    packageTypeFound.name = packageTypeData.name;
                }
                if(packageTypeData.cost){
                    packageTypeFound.cost = packageTypeData.cost;
                }
                if (packageTypeData.description) {
                    packageTypeFound.description = packageTypeData.description;
                }
                packageTypeFound.precreated = packageTypeData.precreated || packageTypeFound.precreated;
            }else{
                return null;
            }
            packageTypeFound.updated_by = packageTypeData.updated_by
            packageTypeFound.updated_at = DateUtils.formatDate(new Date());
            return await PackageTypeRepository.updatePackageType(package_type_id, packageTypeFound);
        }catch (error: any){
            throw new Error(`Error al modificar tipo de paquete: ${error.message}`);
        }
    }

    public static async deletePackageType(package_type_id: number): Promise<boolean> {
        try{
            await PackageTypeRepository.deletePibotDataByPackageTypeId(package_type_id);
            return await PackageTypeRepository.deletePackageType(package_type_id);
        }catch (error: any){
            throw new Error(`Error al eliminar tipo de paquete: ${error.message}`);
        }
    }

}
