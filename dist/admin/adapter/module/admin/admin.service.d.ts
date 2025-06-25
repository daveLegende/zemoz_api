import { IAdminService } from 'src/admin/app/module';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { AdminAccountDto, UpdateAdminDTO } from '../../dto';
export declare class AdminService implements IAdminService {
    private adminRepository;
    private readonly logger;
    constructor(adminRepository: IAdminRepository);
    fetchAll(): Promise<Admin[]>;
    fetchOne(id: string): Promise<Admin>;
    search(data: Partial<Admin>): Promise<Admin>;
    add(data: AdminAccountDto): Promise<Admin>;
    edit(data: UpdateAdminDTO): Promise<Admin>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
