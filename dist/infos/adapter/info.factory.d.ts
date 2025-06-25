import { Info } from "../domain";
import { ICreateInfoDTO, IUpdateInfoDTO } from "../app/dto";
export declare abstract class InfoFactory {
    static create(data: ICreateInfoDTO): Promise<Info>;
    static update(info: Info, data: IUpdateInfoDTO): Info;
    static getFileLink(file: string): string;
    static getInfo(info: Info): Info;
}
