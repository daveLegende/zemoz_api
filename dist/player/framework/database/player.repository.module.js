"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("./schema/player.entity");
const domain_1 = require("../../domain");
const player_repository_1 = require("./player.repository");
let PlayerRepositoryModule = class PlayerRepositoryModule {
};
PlayerRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.PlayerEntity])],
        providers: [
            {
                provide: domain_1.IPlayerRepository,
                useClass: player_repository_1.PlayerRepository,
            },
        ],
        exports: [domain_1.IPlayerRepository],
    })
], PlayerRepositoryModule);
exports.PlayerRepositoryModule = PlayerRepositoryModule;
//# sourceMappingURL=player.repository.module.js.map