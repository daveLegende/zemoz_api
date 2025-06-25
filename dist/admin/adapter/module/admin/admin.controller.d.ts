import { IDParamDTO } from 'adapter/dto';
import { IAdminController, IAdminService } from 'src/admin/app/module';
import { Admin } from 'src/admin/domain';
import { AdminAccountDto, UpdateAdminDTO } from '../../dto';
export declare class AdminController implements IAdminController {
    private readonly adminService;
    constructor(adminService: IAdminService);
    all(): Promise<Admin[]>;
    search(param: Admin): Promise<Admin>;
    show({ id }: IDParamDTO): Promise<Admin>;
    create(data: AdminAccountDto): Promise<Admin>;
    update(data: UpdateAdminDTO): Promise<Admin>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
