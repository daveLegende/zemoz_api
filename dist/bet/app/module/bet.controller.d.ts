import { IIDParamDTO } from 'app/dto';
import { Bet } from 'src/bet/domain';
import { ICreateBetDTO, IUpdateBetDTO } from '../dto';
export declare abstract class IBetController {
    abstract all(): Promise<Bet[]>;
    abstract show(param: IIDParamDTO): Promise<Bet>;
    abstract create(data: ICreateBetDTO, file?: any): Promise<Bet>;
    abstract search(data: Partial<Bet>, file?: any): Promise<Bet>;
    abstract update(data: IUpdateBetDTO, file?: any): Promise<Bet>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
