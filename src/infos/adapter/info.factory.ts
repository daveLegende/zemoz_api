import { Info } from "../domain";
import { ICreateInfoDTO, IUpdateInfoDTO } from "../app/dto";

export abstract class InfoFactory {
    static async create(data: ICreateInfoDTO): Promise<Info> {
        const info = new Info();

        info.image = data.image;
        info.title = data.title;
        info.desc = data.desc;

        return info;
    }

    static update(info: Info, data: IUpdateInfoDTO): Info {

        info.image = data.image ?? info.image;
        info.title = data.title ?? info.title;
        info.desc = data.desc ?? info.desc;
    
        return info;
      }

      static getFileLink(file: string): string {
        if (file) {
          return `${process.env.APP_BASE_URL}/files/${file}`;
        }
      }
    
      static getInfo(info: Info): Info {
        if (info) {
          return {
            id: info.id,
            image: this.getFileLink(info.image),
            title: info.title,
            desc: info.desc,
            createdAt: info.createdAt,
            updatedAt: info.updatedAt,
            deletedAt: info.deletedAt
          };
        }
      }
}