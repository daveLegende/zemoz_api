import { IDParamDTO } from 'adapter/dto';
import { IForgotPassController, IForgotPassService } from 'src/forgotpass/app/module';
import { ForgotPass } from 'src/forgotpass/domain';
import { ForgotPassAccountDto } from '../dto';
export declare class ForgotPassController implements IForgotPassController {
    private readonly fgpService;
    constructor(fgpService: IForgotPassService);
    all(): Promise<ForgotPass[]>;
    show({ id }: IDParamDTO): Promise<ForgotPass>;
    create(data: ForgotPassAccountDto): Promise<ForgotPass>;
    remove({ id }: IDParamDTO): Promise<boolean>;
    verifyCode(data: ForgotPassAccountDto): Promise<boolean>;
}
