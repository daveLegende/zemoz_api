"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const domain_1 = require("../../domain");
const transac_entity_1 = require("./schema/transac.entity");
const transac_repository_1 = require("./transac.repository");
let TransactionRepositoryModule = class TransactionRepositoryModule {
};
TransactionRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transac_entity_1.TransactionEntity])],
        providers: [
            {
                provide: domain_1.ITransactionRepository,
                useClass: transac_repository_1.TransactionRepository,
            },
        ],
        exports: [domain_1.ITransactionRepository],
    })
], TransactionRepositoryModule);
exports.TransactionRepositoryModule = TransactionRepositoryModule;
//# sourceMappingURL=transac.repository.module.js.map