import { OnApplicationBootstrap } from '@nestjs/common';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { IGenericRepository } from 'src/igeneric.interface';
import { AdminEntity } from './schema/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminRepository implements IAdminRepository, OnApplicationBootstrap {
    private adminRepository;
    admins: IGenericRepository<Admin>;
    constructor(adminRepository: Repository<AdminEntity>);
    onApplicationBootstrap(): void;
}
