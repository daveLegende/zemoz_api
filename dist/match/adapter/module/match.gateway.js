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
exports.MatchGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const dto_1 = require("../dto");
const module_1 = require("../../app/module");
const module_2 = require("../../../coupon/app/module");
let MatchGateway = class MatchGateway {
    constructor(matchService, couponService) {
        this.matchService = matchService;
        this.couponService = couponService;
    }
    async handleScoreUpdate(updateScoreDto) {
        try {
            const updatedMatch = await this.matchService.updateScore(updateScoreDto);
            console.log('Match mis à jour:', updatedMatch);
            this.server.emit('scoreUpdated', updatedMatch);
            const couponStatus = await this.couponService.validatePendingCoupons();
            this.server.emit('couponStatusCheck', couponStatus);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du score:', error.message);
            this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
        }
    }
    async handleStateUpdate(updateStateDto) {
        const updatedMatch = await this.matchService.updateState(updateStateDto);
        this.server.emit('stateUpdated', updatedMatch);
        const couponStatus = await this.couponService.validatePendingCoupons();
        this.server.emit('couponStatusCheck', couponStatus);
    }
    async handleListenForUpdates(client) {
        this.server.on('scoreUpdated', (updatedMatch) => {
            this.handleCustomState(updatedMatch, 'score');
        });
        this.server.on('stateUpdated', (updatedMatch) => {
            this.handleCustomState(updatedMatch, 'state');
        });
        client.emit('listeningStarted', { success: true });
    }
    async handleCustomState(matchData, triggerType) {
        try {
            const customState = {
                matchId: matchData.id,
                trigger: triggerType,
                timestamp: new Date(),
                status: 'custom_state_triggered',
                data: matchData
            };
            this.server.emit('customStateUpdated', customState);
            console.log(`Nouvel état personnalisé émis pour le match ${matchData.id}`);
        }
        catch (error) {
            console.error('Erreur dans handleCustomState:', error.message);
            this.server.emit('error', {
                message: 'Erreur lors du traitement de l\'état personnalisé',
                details: error.message
            });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MatchGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateScore'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateMatchScoreEventDto]),
    __metadata("design:returntype", Promise)
], MatchGateway.prototype, "handleScoreUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateState'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateStateDto]),
    __metadata("design:returntype", Promise)
], MatchGateway.prototype, "handleStateUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('listenForUpdates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchGateway.prototype, "handleListenForUpdates", null);
MatchGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(81, { transports: ['websocket'] }),
    __metadata("design:paramtypes", [module_1.IMatchService,
        module_2.ICouponService])
], MatchGateway);
exports.MatchGateway = MatchGateway;
//# sourceMappingURL=match.gateway.js.map