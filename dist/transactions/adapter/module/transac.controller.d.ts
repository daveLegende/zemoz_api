import { IDParamDTO } from 'adapter/dto';
import { ITransactionController, ITransactionService } from 'src/transactions/app/module';
import { PassAccountDto, TransactionAccountDto, UpdateTransactionDTO } from '../dto';
import { Transaction } from 'src/transactions/domain';
export declare class TransactionController implements ITransactionController {
    private readonly transactionService;
    constructor(transactionService: ITransactionService);
    all(): Promise<Transaction[]>;
    search(param: Transaction): Promise<Transaction>;
    show({ id }: IDParamDTO): Promise<Transaction>;
    create(data: TransactionAccountDto, pass: PassAccountDto): Promise<Transaction>;
    update(data: UpdateTransactionDTO): Promise<Transaction>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
    userTransac(data: TransactionAccountDto): Promise<Transaction>;
}
