import { IIDParamDTO } from 'app/dto';
import { Paris } from 'src/paris/domain';
import { ICreateParisDTO, IUpdateParisDTO } from '../dto';
export declare abstract class IParisController {
    abstract all(): Promise<Paris[]>;
    abstract show(param: IIDParamDTO): Promise<Paris>;
    abstract create(data: ICreateParisDTO, file?: any): Promise<Paris>;
    abstract search(data: Partial<Paris>, file?: any): Promise<Paris>;
    abstract update(data: IUpdateParisDTO, file?: any): Promise<Paris>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
