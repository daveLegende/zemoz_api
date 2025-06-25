import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { IGenericRepository } from 'src/igeneric.interface';
import { AdminEntity } from './schema/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRepository implements IAdminRepository, OnApplicationBootstrap {
    
    admins: IGenericRepository<Admin>;

    constructor(
        @InjectRepository(AdminEntity)
        private adminRepository: Repository<AdminEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.admins = new DBGenericRepository<AdminEntity>(this.adminRepository);
    }
}
