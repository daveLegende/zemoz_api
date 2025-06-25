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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../../domain");
const admin_factory_1 = require("../../admin.factory");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.adminRepository.admins.find();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const admin = await this.adminRepository.admins.findOneByID(id);
            if (admin) {
                return admin;
            }
            throw new common_1.NotFoundException('Admin not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.adminRepository.admins.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { nom, password, email } = data;
            if (!nom || password || email)
                throw new common_1.BadRequestException("Invalid credentials");
            const existed = await this.adminRepository.admins.findOneBy({ email });
            if (existed)
                throw new common_1.ConflictException('Admin already exist');
            return await this.adminRepository.admins.create(await admin_factory_1.AdminFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const admin = id && (await this.adminRepository.admins.findOneByID(id));
            if (admin) {
                return await this.adminRepository.admins.update(admin_factory_1.AdminFactory.update(admin, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.editAdmin');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const admin = await this.adminRepository.admins.findOneByID(id);
            if (admin) {
                return await this.adminRepository.admins.remove(admin).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::AdminService.remove');
            return false;
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IAdminRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map