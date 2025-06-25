import { JwtService } from '@nestjs/jwt';
import { IAdminService } from 'src/admin/app/module';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { AdminAccountDto } from '../../dto';
export declare class AdminAuthService {
    private adminService;
    private adminRepository;
    private jwtService;
    private readonly logger;
    constructor(adminService: IAdminService, adminRepository: IAdminRepository, jwtService: JwtService);
    validateAdmin(email: string, password: string): Promise<any>;
    login(admin: any): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: Admin;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(data: AdminAccountDto): Promise<Admin>;
}
