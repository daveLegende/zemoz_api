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
const user_1 = require("../../../user/app/module/user");
const module_3 = require("../../../paris/app/module");
const typeorm_1 = require("typeorm");
const domain_1 = require("../../domain");
let MatchGateway = class MatchGateway {
    constructor(matchService, couponService, parisService, entityManager, userService) {
        this.matchService = matchService;
        this.couponService = couponService;
        this.parisService = parisService;
        this.entityManager = entityManager;
        this.userService = userService;
    }
    async handleScoreUpdate(updateScoreDto) {
        try {
            const updatedMatch = await this.matchService.updateScore(updateScoreDto);
            console.log('Match mis à jour:', updatedMatch);
            this.server.emit('scoreUpdated', updatedMatch);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du score:', error.message);
            this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
        }
    }
    async handleStateUpdate(updateStateDto) {
        const updatedMatch = await this.matchService.updateState(updateStateDto);
        this.server.emit('stateUpdated', updatedMatch);
        this.handleCustomState(updatedMatch.id, 'state');
    }
    async handleListenForUpdates(client) {
        this.server.on('stateUpdated', (updatedMatch) => {
            this.handleCustomState(updatedMatch, 'state');
        });
        client.emit('listeningStarted', { success: true });
    }
    async handleCustomState(matchId, triggerType) {
        try {
            const pendingBets = await this.parisService.getPendingParisForMatch(matchId);
            const match = await this.matchService.fetchOne(matchId);
            const { home: homeScore, away: awayScore } = match.scores;
            const matchResult = homeScore > awayScore ? 'V1' :
                homeScore < awayScore ? 'V2' : 'X';
            if (match.etat === domain_1.MatchState.TERMINER) {
                await this.entityManager.transaction(async (transactionalEntityManager) => {
                    for (const bet of pendingBets) {
                        const isWinningBet = bet.type === matchResult;
                        bet.isWon = isWinningBet;
                        bet.state = isWinningBet ? 'Won' : 'Lost';
                        if (isWinningBet) {
                            const user = await this.userService.fetchOne(bet.user.id);
                            user.solde += bet.potentialGain;
                            await transactionalEntityManager.save(user);
                            bet.isPaid = true;
                        }
                        await transactionalEntityManager.save(bet);
                    }
                });
                this.server.emit('customStateUpdated', {
                    matchId: matchId,
                    trigger: triggerType,
                    timestamp: new Date(),
                    status: 'custom_state_triggered',
                    processedBets: pendingBets.length,
                    data: matchId
                });
                console.log(`Pari traités pour le match ${matchId}`);
            }
        }
        catch (error) {
            console.error('Erreur dans handleCustomState:', error);
            this.server.emit('error', {
                message: 'Erreur lors du traitement des paris',
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
        module_2.ICouponService,
        module_3.IParisService,
        typeorm_1.EntityManager,
        user_1.IUserService])
], MatchGateway);
exports.MatchGateway = MatchGateway;
//# sourceMappingURL=match.gateway.js.map