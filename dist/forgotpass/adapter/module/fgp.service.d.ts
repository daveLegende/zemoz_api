import { ForgotPassAccountDto } from '../dto';
import { IUserRepository } from 'user/domain';
import { IForgotPassService } from 'src/forgotpass/app/module';
import { ForgotPass, IForgotPassRepository } from 'src/forgotpass/domain';
export declare class ForgotPassService implements IForgotPassService {
    private fgpRepository;
    private userRepository;
    private readonly logger;
    constructor(fgpRepository: IForgotPassRepository, userRepository: IUserRepository);
    fetchAll(): Promise<ForgotPass[]>;
    fetchOne(id: string): Promise<ForgotPass>;
    add(data: ForgotPassAccountDto): Promise<ForgotPass>;
    remove(id: string): Promise<boolean>;
    verifyCode(data: ForgotPassAccountDto): Promise<boolean>;
}
