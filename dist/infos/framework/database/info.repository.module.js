"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const domain_1 = require("../../domain");
const info_repository_1 = require("./info.repository");
const info_entity_1 = require("./schema/info.entity");
let InfoRepositoryModule = class InfoRepositoryModule {
};
InfoRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([info_entity_1.InfoEntity])],
        providers: [
            {
                provide: domain_1.IInfoRepository,
                useClass: info_repository_1.InfoRepository,
            },
        ],
        exports: [domain_1.IInfoRepository],
    })
], InfoRepositoryModule);
exports.InfoRepositoryModule = InfoRepositoryModule;
//# sourceMappingURL=info.repository.module.js.map