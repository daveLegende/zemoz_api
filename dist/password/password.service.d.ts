import { Repository } from 'typeorm';
import { PasswordEntity } from './entity/pwd.entity';
export declare class PasswordService {
    private passwordRepository;
    private readonly logger;
    constructor(passwordRepository: Repository<PasswordEntity>);
    generateAndSendPassword(): Promise<void>;
    deleteOldPasswords(): Promise<void>;
    scheduleDailyPasswordGeneration(): Promise<void>;
}
