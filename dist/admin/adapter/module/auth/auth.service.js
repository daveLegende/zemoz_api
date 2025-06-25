"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const module_1 = require("../../../app/module");
const domain_1 = require("../../../domain");
const admin_factory_1 = require("../../admin.factory");
const bcrypt = require("bcrypt");
let AdminAuthService = class AdminAuthService {
    constructor(adminService, adminRepository, jwtService) {
        this.adminService = adminService;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger();
    }
    async validateAdmin(email, password) {
        console.log('Validating admin credentials for:', email);
        const admin = await this.adminRepository.admins.findOne({
            where: { email: email }
        });
        if (!admin) {
            throw new common_1.NotFoundException("Aucun admin trouvé");
        }
        console.log('--------------------------' + admin.password);
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log(`Invalid password for admin: ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return admin;
    }
    async login(admin) {
        const payload = { email: admin.email, sub: admin.adminId };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '1m',
        });
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            admin: admin,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            const newAccessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
            const newRefreshToken = this.jwtService.sign({ sub: payload.sub, email: payload.email }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1m' });
            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async register(data) {
        try {
            const { nom, password, email } = data;
            if (!nom || !password || !email)
                throw new common_1.BadRequestException("Invalid credentials");
            const existed = await this.adminRepository.admins.findOneBy({ email });
            if (existed)
                throw new common_1.ConflictException('Admin already exist');
            return await this.adminRepository.admins.create(await admin_factory_1.AdminFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.register');
            throw error;
        }
    }
};
AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [module_1.IAdminService,
        domain_1.IAdminRepository,
        jwt_1.JwtService])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=auth.service.js.map