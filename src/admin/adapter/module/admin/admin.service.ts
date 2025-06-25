import {
  BadRequestException,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IAdminService } from 'src/admin/app/module';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { AdminFactory } from '../../admin.factory';
import { AdminAccountDto, UpdateAdminDTO } from '../../dto';
  
@Injectable()
export class AdminService implements IAdminService {
  private readonly logger = new Logger();
  constructor(
    private adminRepository: IAdminRepository
  ) {}

  async fetchAll(): Promise<Admin[]> {
    try {
      return await this.adminRepository.admins.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Admin> {
    try {
      const admin = await this.adminRepository.admins.findOneByID(id);
      if (admin) {
        return admin;
      }
      throw new NotFoundException('Admin not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Admin>): Promise<Admin> {
    // const Admin = new Admin()
    return await this.adminRepository.admins.findOneBy({ ...data });
  }

  async add(data: AdminAccountDto): Promise<Admin> {
    try {
      const { nom, password, email } = data;
      if(!nom || password || email) throw new BadRequestException("Invalid credentials");
      const existed = await this.adminRepository.admins.findOneBy({ email });
      if (existed)
        throw new ConflictException('Admin already exist');

      return await this.adminRepository.admins.create(
        await AdminFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.add');
      throw error;
    }
  }

  async edit(data: UpdateAdminDTO): Promise<Admin> {
    try {
      const { id } = data;
      const admin = id && (await this.adminRepository.admins.findOneByID(id));
      if (admin) {
        return await this.adminRepository.admins.update(
          AdminFactory.update(admin, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.editAdmin');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const admin = await this.adminRepository.admins.findOneByID(id);
      if (admin) {
        return await this.adminRepository.admins.remove(admin).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.remove');
      return false;
    }
  }
}
  