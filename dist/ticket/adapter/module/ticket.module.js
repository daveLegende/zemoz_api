"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const module_1 = require("../../app/module");
const ticket_controller_1 = require("./ticket.controller");
const ticket_repository_module_1 = require("../../framework/database/ticket.repository.module");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const API_1 = require("../../../user/framework/API");
const API_2 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
let TicketModule = class TicketModule {
};
TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ticket_repository_module_1.TicketRepositoryModule,
            match_repository_module_1.MatchRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
        ],
        controllers: [ticket_controller_1.TicketController],
        providers: [{ provide: module_1.ITicketService, useClass: ticket_service_1.TicketService }],
        exports: [module_1.ITicketService, ticket_repository_module_1.TicketRepositoryModule],
    })
], TicketModule);
exports.TicketModule = TicketModule;
//# sourceMappingURL=ticket.module.js.map