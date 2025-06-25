"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fgp_entity_1 = require("./schema/fgp.entity");
const domain_1 = require("../../domain");
const fgp_repository_1 = require("./fgp.repository");
let ForgotPassRepositoryModule = class ForgotPassRepositoryModule {
};
ForgotPassRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fgp_entity_1.ForgotPassEntity])],
        providers: [
            {
                provide: domain_1.IForgotPassRepository,
                useClass: fgp_repository_1.ForgotPassRepository,
            },
        ],
        exports: [domain_1.IForgotPassRepository],
    })
], ForgotPassRepositoryModule);
exports.ForgotPassRepositoryModule = ForgotPassRepositoryModule;
//# sourceMappingURL=fgp.repository.module.js.map