import { Admin } from "../domain";
import { ICreateAdminDTO, IUpdateAdminDTO } from "../app/dto";
export declare abstract class AdminFactory {
    static create(data: ICreateAdminDTO): Promise<Admin>;
    static update(admin: Admin, data: IUpdateAdminDTO): Admin;
    static getFileLink(file: string): string;
    static getAdmin(admin: Admin): Admin;
}
