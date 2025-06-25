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
exports.TicketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const dto_1 = require("../dto");
const module_1 = require("../../app/module");
let TicketGateway = class TicketGateway {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    handleScanTicket(updateTicket) {
        const updatedMatch = this.ticketService.edit(updateTicket);
        this.server.emit('ticketScanned', updatedMatch);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TicketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('scanTicket'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTicketDTO]),
    __metadata("design:returntype", void 0)
], TicketGateway.prototype, "handleScanTicket", null);
TicketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(81, { transports: ['websocket'] }),
    __metadata("design:paramtypes", [module_1.ITicketService])
], TicketGateway);
exports.TicketGateway = TicketGateway;
//# sourceMappingURL=ticket.gateway.js.map