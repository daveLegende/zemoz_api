"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEventRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const match_event_entity_1 = require("./schema/match.event.entity");
const domain_1 = require("../../domain");
const match_event_repository_1 = require("./match.event.repository");
let MatchEventRepositoryModule = class MatchEventRepositoryModule {
};
MatchEventRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([match_event_entity_1.MatchEventEntity])],
        providers: [
            {
                provide: domain_1.IMatchEventRepository,
                useClass: match_event_repository_1.MatchEventRepository,
            },
        ],
        exports: [domain_1.IMatchEventRepository],
    })
], MatchEventRepositoryModule);
exports.MatchEventRepositoryModule = MatchEventRepositoryModule;
//# sourceMappingURL=match.event.repository.module.js.map