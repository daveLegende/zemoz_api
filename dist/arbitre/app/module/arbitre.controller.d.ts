import { IIDParamDTO } from 'app/dto';
import { Arbitre } from 'src/arbitre/domain';
import { ICreateArbitreDTO, IUpdateArbitreDTO } from '../dto';
export declare abstract class IArbitreController {
    abstract all(): Promise<Arbitre[]>;
    abstract show(param: IIDParamDTO): Promise<Arbitre>;
    abstract create(data: ICreateArbitreDTO, file?: any): Promise<Arbitre>;
    abstract search(data: Partial<Arbitre>, file?: any): Promise<Arbitre>;
    abstract update(data: IUpdateArbitreDTO, file?: any): Promise<Arbitre>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
