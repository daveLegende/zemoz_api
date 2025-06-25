import { IGenericRepository } from "src/igeneric.interface";
import { Admin } from "./admin.model";
export declare abstract class IAdminRepository {
    abstract admins: IGenericRepository<Admin>;
}
