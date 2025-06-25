import { AdminAuthService } from './auth.service';
import { AdminAccountDto } from '../../dto';
import { Admin } from 'src/admin/domain';
export declare class AuthController {
    private authService;
    constructor(authService: AdminAuthService);
    login(loginDto: AdminAccountDto): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: Admin;
    }>;
    refreshToken(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(data: AdminAccountDto): Promise<Admin>;
}
