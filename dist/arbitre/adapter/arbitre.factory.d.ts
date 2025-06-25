import { ICreateArbitreDTO, IUpdateArbitreDTO } from "../app/dto";
import { Arbitre } from "../domain";
export declare abstract class ArbitreFactory {
    static create(data: ICreateArbitreDTO): Promise<Arbitre>;
    static update(arbitre: Arbitre, data: IUpdateArbitreDTO): Arbitre;
    static getFileLink(file: string): string;
    static getArbitre(arbitre: Arbitre): Arbitre;
}
