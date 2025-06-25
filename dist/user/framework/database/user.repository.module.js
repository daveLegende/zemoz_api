"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const user_entity_1 = require("./schema/user.entity");
const data_abstract_1 = require("../../domain/data.abstract");
let UserRepositoryModule = class UserRepositoryModule {
};
UserRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        providers: [
            {
                provide: data_abstract_1.IUserRepository,
                useClass: user_repository_1.UserRepository,
            },
        ],
        exports: [data_abstract_1.IUserRepository],
    })
], UserRepositoryModule);
exports.UserRepositoryModule = UserRepositoryModule;
//# sourceMappingURL=user.repository.module.js.map