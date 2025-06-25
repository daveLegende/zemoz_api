import { IIDParamDTO } from 'app/dto';
import { Transaction } from 'src/transactions/domain';
import { ICreatePassDTO, ICreateTransactionDTO, IUpdateTransactionDTO } from '../dto';
export declare abstract class ITransactionController {
    abstract all(): Promise<Transaction[]>;
    abstract show(param: IIDParamDTO): Promise<Transaction>;
    abstract create(data: ICreateTransactionDTO, pass: ICreatePassDTO, file?: any): Promise<Transaction>;
    abstract search(data: Partial<Transaction>, file?: any): Promise<Transaction>;
    abstract update(data: IUpdateTransactionDTO, file?: any): Promise<Transaction>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
    abstract userTransac(data: ICreateTransactionDTO, file?: any): Promise<Transaction>;
}
