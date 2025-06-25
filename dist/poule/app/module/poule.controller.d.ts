import { IIDParamDTO } from 'app/dto';
import { Poule } from 'src/poule/domain';
import { ICreatePouleDTO, IUpdatePouleDTO } from '../dto';
export declare abstract class IPouleController {
    abstract all(): Promise<Poule[]>;
    abstract show(param: IIDParamDTO): Promise<Poule>;
    abstract create(data: ICreatePouleDTO, file?: any): Promise<Poule>;
    abstract search(data: Partial<Poule>, file?: any): Promise<Poule>;
    abstract update(data: IUpdatePouleDTO, file?: any): Promise<Poule>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
