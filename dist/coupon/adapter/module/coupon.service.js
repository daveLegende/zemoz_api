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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const data_abstract_1 = require("../../domain/data.abstract");
const domain_2 = require("../../../user/domain");
const coupon_factory_1 = require("../coupon.factory");
const data_abstract_2 = require("../../../bet/domain/data.abstract");
const data_abstract_3 = require("../../../couponBet/domain/data.abstract");
const domain_3 = require("../../../couponBet/domain");
const match_gateway_1 = require("../../../match/adapter/module/match.gateway");
const domain_4 = require("../../../match/domain");
const typeorm_1 = require("typeorm");
const domain_5 = require("../../../bet/domain");
let CouponService = class CouponService {
    constructor(connection, couponsRepository, userRepository, betRepository, cpRepository, matchRepository, matchGateway) {
        this.connection = connection;
        this.couponsRepository = couponsRepository;
        this.userRepository = userRepository;
        this.betRepository = betRepository;
        this.cpRepository = cpRepository;
        this.matchRepository = matchRepository;
        this.matchGateway = matchGateway;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.couponsRepository.coupons.find({
                relations: {
                    user: true,
                    couponBets: {
                        bet: {
                            match: true,
                        },
                    },
                },
                order: {
                    createdAt: 'DESC',
                },
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponsService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const coupons = await this.couponsRepository.coupons.findOne({
                where: { id: id },
                relations: {
                    user: true,
                    couponBets: {
                        bet: {
                            match: true,
                        },
                    },
                },
                order: {
                    createdAt: 'DESC',
                },
            });
            if (coupons) {
                return coupons;
            }
            throw new common_1.NotFoundException('coupons not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponsService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.couponsRepository.coupons.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { amount, user, couponBets } = data;
            const userExisted = await this.userRepository.users.findOneByID(user);
            if (!userExisted)
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            let totalOdds = 1;
            for (const cp of couponBets) {
                const betExisted = await this.betRepository.bets.findOneByID(cp.id);
                if (!betExisted) {
                    throw new common_1.NotFoundException(`Bet non trouvé`);
                }
                const selectedOdds = cp.selectedOptions[Object.keys(cp.selectedOptions)[0]];
                totalOdds *= selectedOdds;
            }
            const gains = totalOdds * amount;
            if (amount < 100) {
                throw new common_1.BadRequestException("Une mise minimum de 100frs");
            }
            else if (amount > 100000) {
                throw new common_1.BadRequestException("La mise ne doit pas dépassée 100000frs");
            }
            else {
                if (amount > userExisted.solde) {
                    throw new common_1.BadRequestException("Votre solde est insuffisant veuillez le recharger");
                }
                else {
                    userExisted.solde -= amount;
                    const couponData = Object.assign(Object.assign({}, data), { totalOdds: totalOdds, gains: gains });
                    const coupon = await this.couponsRepository.coupons.create(await coupon_factory_1.CouponFactory.create(couponData, userExisted));
                    await this.userRepository.users.update(userExisted);
                    for (const cp of couponBets) {
                        const cpbDto = new domain_3.CouponBet();
                        cpbDto.coupon = coupon;
                        cpbDto.bet = cp.bet;
                        cpbDto.selectedOptions = cp.selectedOptions;
                        await this.cpRepository.couponBets.create(cpbDto);
                    }
                    return coupon;
                }
            }
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponservice.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const coupons = id && (await this.couponsRepository.coupons.findOne({
                where: { id: id },
                relations: { user: true, couponBets: true }
            }));
            if (coupons) {
                return await this.couponsRepository.coupons.update(coupon_factory_1.CouponFactory.update(coupons, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponservice.editcoupons');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const coupons = await this.couponsRepository.coupons.findOne({
                where: { id: id },
                relations: { user: true, couponBets: true }
            });
            if (coupons) {
                return await this.couponsRepository.coupons.remove(coupons).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponservice.remove');
            return false;
        }
    }
    async checkCoupons(data) {
        const { id } = data;
        const match = await this.matchRepository.matchs.findOneByID(id);
        console.log("-----------------------------------------------------------", match);
        const coupons = await this.getActiveCoupons();
        if (!match) {
            throw new common_1.NotFoundException('Match not found');
        }
        for (const coupon of coupons) {
            console.log(coupon);
            const relevantBets = coupon.couponBets.filter((couponBet) => {
                var _a;
                console.log("------*******", couponBet.bet);
                if (!couponBet.bet || !couponBet.bet.match) {
                    console.error(`Bet ${(_a = couponBet.bet) === null || _a === void 0 ? void 0 : _a.id} does not have a match associated.`);
                    return false;
                }
                return couponBet.bet.match.id === match.id;
            });
            for (const bet of relevantBets) {
                if (this.isBetWinning(bet, match)) {
                    this.logger.log(`Bet ${bet.id} a gagné`);
                    bet.status = domain_3.BetStatus.GAGNE;
                    await this.updateBetStatus(bet, domain_3.BetStatus.GAGNE);
                }
                else {
                    this.logger.log(`Bet ${bet.id} a perdu`);
                    bet.status = domain_3.BetStatus.PERDU;
                    await this.updateBetStatus(bet, domain_3.BetStatus.PERDU);
                }
            }
            await this.updateCouponStatus(coupon);
        }
    }
    isBetWinning(cb, match) {
        const key = Object.keys(cb.selectedOptions)[0];
        console.log("--------------------------------", key);
        switch (cb.bet.category) {
            case domain_5.CategoryName.VICTOIRE:
                if (match.etat !== domain_4.MatchState.TERMINER) {
                    return false;
                }
                if (key === 'V1' && match.scores.home > match.scores.away)
                    return true;
                if (key === 'V2' && match.scores.away > match.scores.home)
                    return true;
                if (key === 'X' && match.scores.home === match.scores.away)
                    return true;
                break;
            case domain_5.CategoryName.DEUX_MARQUENT:
                return match.scores.home > 0 && match.scores.away > 0;
            case domain_5.CategoryName.CARTON_ROUGE:
                return match.events.some((event) => event.type === 'CARTON_ROUGE');
            default:
                return false;
        }
        return false;
    }
    async updateBetStatus(couponBet, status) {
        this.logger.log(`Mise à jour du statut du pari`);
        couponBet.status = status;
        const cb = await this.cpRepository.couponBets.update(couponBet);
        return cb;
    }
    async getActiveCoupons() {
        try {
            const coupons = await this.couponsRepository.coupons.find({
                where: { etat: domain_1.CouponState.PENDING },
                relations: {
                    couponBets: {
                        bet: {
                            match: true,
                        },
                    },
                    user: true,
                }
            });
            return coupons;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponsService.fetchAllActive');
            throw error;
        }
    }
    async updateCouponStatus(coupon) {
        const allBetsWon = coupon.couponBets.every(bet => bet.status === domain_3.BetStatus.GAGNE);
        const anyBetLost = coupon.couponBets.some(bet => bet.status === domain_3.BetStatus.PERDU);
        const user = await this.userRepository.users.findOneByID(coupon.user.id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (allBetsWon) {
            coupon.etat = domain_1.CouponState.WIN;
            user.solde += coupon.gains;
        }
        else if (anyBetLost) {
            coupon.etat = domain_1.CouponState.LOOSE;
        }
        else {
            coupon.etat = domain_1.CouponState.PENDING;
        }
        const cp = await this.couponsRepository.coupons.update(coupon);
        await this.userRepository.users.update(user);
        return cp;
    }
    async validatePendingCoupons() {
        const coupons = await this.getActiveCoupons();
        for (const coupon of coupons) {
            let couponUpdated = false;
            for (const couponBet of coupon.couponBets) {
                const match = couponBet.bet.match;
                if (this.canBetBeValidatedEarly(couponBet, match)) {
                    if (this.isBetWinning(couponBet, match)) {
                        this.logger.log(`Bet ${couponBet.id} a gagné (validation en temps réel)`);
                        await this.updateBetStatus(couponBet, domain_3.BetStatus.GAGNE);
                    }
                    else {
                        this.logger.log(`Bet ${couponBet.id} a perdu`);
                        await this.updateBetStatus(couponBet, domain_3.BetStatus.PERDU);
                    }
                    couponUpdated = true;
                    continue;
                }
                if (match.etat !== domain_4.MatchState.TERMINER) {
                    continue;
                }
                if (this.isBetWinning(couponBet, match)) {
                    this.logger.log(`Bet ${couponBet.id} a gagné`);
                    await this.updateBetStatus(couponBet, domain_3.BetStatus.GAGNE);
                }
                else {
                    this.logger.log(`Bet ${couponBet.id} a perdu`);
                    await this.updateBetStatus(couponBet, domain_3.BetStatus.PERDU);
                }
                couponUpdated = true;
            }
            if (couponUpdated) {
                await this.updateCouponStatus(coupon);
            }
        }
    }
    canBetBeValidatedEarly(couponBet, match) {
        const key = Object.keys(couponBet.selectedOptions)[0];
        switch (couponBet.bet.category) {
            case domain_5.CategoryName.DEUX_MARQUENT:
                return match.scores.home > 0 && match.scores.away > 0;
            case domain_5.CategoryName.CARTON_ROUGE:
                return match.events.some((event) => event.type === 'CARTON_ROUGE');
            default:
                return false;
        }
    }
};
CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => match_gateway_1.MatchGateway))),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        data_abstract_1.ICouponRepository,
        domain_2.IUserRepository,
        data_abstract_2.IBetRepository,
        data_abstract_3.ICouponBetRepository,
        domain_4.IMatchRepository,
        match_gateway_1.MatchGateway])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=coupon.service.js.map