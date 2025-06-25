"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const module_1 = require("../../app/module");
const transac_repository_module_1 = require("../../framework/database/transac.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const transac_controller_1 = require("./transac.controller");
const transac_service_1 = require("./transac.service");
const password_module_1 = require("../../../password/password.module");
const typeorm_1 = require("@nestjs/typeorm");
const pwd_entity_1 = require("../../../password/entity/pwd.entity");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            transac_repository_module_1.TransactionRepositoryModule,
            password_module_1.PasswordModule,
            typeorm_1.TypeOrmModule.forFeature([pwd_entity_1.PasswordEntity]),
            user_repository_module_1.UserRepositoryModule,
            API_2.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_1.AdminAuthApiModule,
        ],
        controllers: [transac_controller_1.TransactionController],
        providers: [{ provide: module_1.ITransactionService, useClass: transac_service_1.TransactionService }],
        exports: [module_1.ITransactionService, transac_repository_module_1.TransactionRepositoryModule],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transac.module.js.map