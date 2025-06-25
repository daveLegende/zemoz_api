import { Admin } from "src/admin/domain";
import { ICreateAdminDTO, IUpdateAdminDTO } from "../../dto";
export declare abstract class IAdminService {
    abstract add(data: ICreateAdminDTO): Promise<Admin>;
    abstract fetchAll(): Promise<Admin[]>;
    abstract fetchOne(id: string): Promise<Admin>;
    abstract edit(data: IUpdateAdminDTO): Promise<Admin>;
    abstract setState(id: string): Promise<boolean>;
    abstract search(data: Partial<Admin>): Promise<Admin>;
    abstract remove(id: string): Promise<boolean>;
}
