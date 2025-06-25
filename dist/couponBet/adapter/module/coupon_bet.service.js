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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponBetService = void 0;
const common_1 = require("@nestjs/common");
const coupon_bet_factory_1 = require("../coupon_bet.factory");
const data_abstract_1 = require("../../../bet/domain/data.abstract");
const domain_1 = require("../../domain");
const data_abstract_2 = require("../../domain/data.abstract");
const data_abstract_3 = require("../../../coupon/domain/data.abstract");
let CouponBetService = class CouponBetService {
    constructor(couponBetsRepository, couponRepository, betRepository) {
        this.couponBetsRepository = couponBetsRepository;
        this.couponRepository = couponRepository;
        this.betRepository = betRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.couponBetsRepository.couponBets.find({
                relations: { bet: true, coupon: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponsService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const coupons = await this.couponBetsRepository.couponBets.findOne({
                where: { id: id },
                relations: { bet: true, coupon: true }
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
        return await this.couponBetsRepository.couponBets.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { selectedOptions, bet, coupon } = data;
            const betExisted = await this.betRepository.bets.findOneByID(bet);
            if (!betExisted)
                throw new common_1.NotFoundException("Bet non trouvé");
            const couponExisted = await this.couponRepository.coupons.findOneByID(coupon);
            if (!couponExisted)
                throw new common_1.NotFoundException("Coupon non trouvé");
            const optionsSelected = {
                V1: selectedOptions.V1,
                V2: selectedOptions.V2,
                X: selectedOptions.X,
                OUI: selectedOptions.OUI,
                NON: selectedOptions.NON,
            };
            return await this.couponBetsRepository.couponBets.create(await coupon_bet_factory_1.CouponBetFactory.create(data, betExisted, couponExisted, optionsSelected));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponservice.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const coupons = id && (await this.couponBetsRepository.couponBets.findOne({
                where: { id: id },
                relations: { bet: true, coupon: true }
            }));
            if (coupons) {
                if (coupons.status === domain_1.BetStatus.PENDING) {
                    return await this.couponBetsRepository.couponBets.update(coupon_bet_factory_1.CouponBetFactory.update(coupons, data));
                }
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
            const coupons = await this.couponBetsRepository.couponBets.findOne({
                where: { id: id },
                relations: { bet: true, coupon: true }
            });
            if (coupons) {
                return await this.couponBetsRepository.couponBets.remove(coupons).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::couponservice.remove');
            return false;
        }
    }
};
CouponBetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_abstract_2.ICouponBetRepository,
        data_abstract_3.ICouponRepository,
        data_abstract_1.IBetRepository])
], CouponBetService);
exports.CouponBetService = CouponBetService;
//# sourceMappingURL=coupon_bet.service.js.map