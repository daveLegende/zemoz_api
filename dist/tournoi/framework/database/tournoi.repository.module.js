"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournoiRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const domain_1 = require("../../domain");
const tournoi_repository_1 = require("./tournoi.repository");
const tournoi_entity_1 = require("./schema/tournoi.entity");
let TournoiRepositoryModule = class TournoiRepositoryModule {
};
TournoiRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tournoi_entity_1.TournoiEntity])],
        providers: [
            {
                provide: domain_1.ITournoiRepository,
                useClass: tournoi_repository_1.TournoiRepository,
            },
        ],
        exports: [domain_1.ITournoiRepository],
    })
], TournoiRepositoryModule);
exports.TournoiRepositoryModule = TournoiRepositoryModule;
//# sourceMappingURL=tournoi.repository.module.js.map