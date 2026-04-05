import { Admin } from "../domain";
import { ICreateAdminDTO, IUpdateAdminDTO } from "../app/dto";
import { HashFactory } from "./guard/hash.factory";

export abstract class AdminFactory {
    static async create(data: ICreateAdminDTO): Promise<Admin> {
        const admin = new Admin();

        admin.nom = data.nom;
        admin.email = data.email;
        admin.password = await HashFactory.hashPwd(data.password);

        return admin;
    }

    static update(admin: Admin, data: IUpdateAdminDTO): Admin {

        admin.nom = data.nom ?? admin.nom;
        admin.email = data.email ?? admin.email;
        // admin.password = data.password ?? admin.password;
    
        return admin;
      }

      static getFileLink(file: string): string {
        if (file) {
          return `${process.env.APP_BASE_URL}/files/${file}`;
        }
      }
    
      static getAdmin(admin: Admin): Admin {
        if (admin) {
          return {
            id: admin.id,
            nom: admin.nom,
            email: admin.email,
            password: admin.password,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
            deletedAt: admin.deletedAt
          };
        }
      }
}