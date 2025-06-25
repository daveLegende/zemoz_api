"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParisRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_abstract_1 = require("../domain/data.abstract");
const paris_repository_1 = require("./paris.repository");
const paris_entity_1 = require("./schema/paris.entity");
let ParisRepositoryModule = class ParisRepositoryModule {
};
ParisRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([paris_entity_1.ParisEntity])],
        providers: [
            {
                provide: data_abstract_1.IParisRepository,
                useClass: paris_repository_1.ParisRepository,
            },
        ],
        exports: [data_abstract_1.IParisRepository],
    })
], ParisRepositoryModule);
exports.ParisRepositoryModule = ParisRepositoryModule;
//# sourceMappingURL=paris.module.repository.js.map