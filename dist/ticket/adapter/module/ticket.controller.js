"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const dto_2 = require("../../../user/adapter/dto");
const ticket_factory_1 = require("../ticket.factory");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const dto_3 = require("../dto");
const doc_ticket_dto_1 = require("../dto/doc.ticket.dto");
const auth_guard_1 = require("../../../user/adapter/guard/auth.guard");
const auth_guard_2 = require("../../../admin/adapter/guard/auth.guard");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async all() {
        const Tickets = await this.ticketService.fetchAll();
        return Tickets === null || Tickets === void 0 ? void 0 : Tickets.map((Ticket) => ticket_factory_1.TicketFactory.getTicket(Ticket));
    }
    async search(param) {
        if (param) {
            return ticket_factory_1.TicketFactory.getTicket(await this.ticketService.search(param));
        }
    }
    async show({ id }) {
        return ticket_factory_1.TicketFactory.getTicket(await this.ticketService.fetchOne(id));
    }
    async create(data) {
        const Ticket = await this.ticketService.add(data);
        if (Ticket)
            return ticket_factory_1.TicketFactory.getTicket(Ticket);
    }
    async update(data) {
        return ticket_factory_1.TicketFactory.getTicket(await this.ticketService.edit(data));
    }
    async setState({ id }) {
        return await this.ticketService.setState(id);
    }
    remove({ id }) {
        return this.ticketService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tickets list',
        description: 'Fetch all Tickets in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Ticket]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Ticket',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_ticket_dto_1.DocTicketOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Ticket',
    }),
    (0, swagger_1.ApiBody)({ type: dto_2.RegisterAccoutDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.TicketAccoutDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_3.UpdateTicketDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_ticket_dto_1.DocTicketOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.UpdateTicketDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "setState", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Account' }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the user to delete',
    }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "remove", null);
TicketController = __decorate([
    (0, swagger_1.ApiTags)('tickets management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard, auth_guard_2.AdminGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [module_1.ITicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map