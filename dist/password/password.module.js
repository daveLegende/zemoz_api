"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const password_service_1 = require("./password.service");
const pwd_entity_1 = require("./entity/pwd.entity");
const schedule_1 = require("@nestjs/schedule");
let PasswordModule = class PasswordModule {
};
PasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), typeorm_1.TypeOrmModule.forFeature([pwd_entity_1.PasswordEntity])],
        providers: [password_service_1.PasswordService],
        exports: [password_service_1.PasswordService],
    })
], PasswordModule);
exports.PasswordModule = PasswordModule;
//# sourceMappingURL=password.module.js.map