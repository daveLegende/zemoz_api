import { ITransactionService } from 'src/transactions/app/module';
import { ITransactionRepository, Transaction } from 'src/transactions/domain';
import { PassAccountDto, TransactionAccountDto, UpdateTransactionDTO } from '../dto';
import { IUserRepository } from 'user/domain';
import { IAdminRepository } from 'src/admin/domain';
import { PasswordEntity } from 'src/password/entity/pwd.entity';
import { Repository } from 'typeorm';
export declare class TransactionService implements ITransactionService {
    private transactionRepository;
    private userRepository;
    private adminRepository;
    private passwordRepository;
    private readonly logger;
    constructor(transactionRepository: ITransactionRepository, userRepository: IUserRepository, adminRepository: IAdminRepository, passwordRepository: Repository<PasswordEntity>);
    fetchAll(): Promise<Transaction[]>;
    fetchOne(id: string): Promise<Transaction>;
    search(data: Partial<Transaction>): Promise<Transaction>;
    add(data: TransactionAccountDto, pass: PassAccountDto): Promise<Transaction>;
    edit(data: UpdateTransactionDTO): Promise<Transaction>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    userTransac(data: TransactionAccountDto): Promise<Transaction>;
}
