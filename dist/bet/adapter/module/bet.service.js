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
exports.BetService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const data_abstract_1 = require("../../domain/data.abstract");
const domain_2 = require("../../../match/domain");
const bet_factory_1 = require("../bet.factory");
let BetService = class BetService {
    constructor(betsRepository, matchRepository) {
        this.betsRepository = betsRepository;
        this.matchRepository = matchRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.betsRepository.bets.find({
                relations: { match: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betsService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const bets = await this.betsRepository.bets.findOne({
                where: { id: id },
                relations: { match: true }
            });
            if (bets) {
                return bets;
            }
            throw new common_1.NotFoundException('bets not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betsService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.betsRepository.bets.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { category, match, odds } = data;
            console.log(odds);
            if (odds === null) {
                throw new common_1.NotFoundException("odds not found");
            }
            else {
                const matchExisted = await this.matchRepository.matchs.findOneByID(match);
                if (!matchExisted)
                    throw new common_1.NotFoundException("Match non trouvé");
                let oddsRecord = {};
                if (category === domain_1.CategoryName.VICTOIRE || category === domain_1.CategoryName.CARTON_JAUNE) {
                    oddsRecord = {
                        V1: odds.V1,
                        V2: odds.V2,
                        X: odds.X,
                    };
                }
                else {
                    oddsRecord = {
                        OUI: odds.OUI,
                        NON: odds.NON,
                    };
                }
                const existed = await this.betsRepository.bets.findOne({
                    where: {
                        category: category,
                        match: matchExisted,
                    }
                });
                if (existed)
                    throw new common_1.ConflictException('bets already exist');
                return await this.betsRepository.bets.create(await bet_factory_1.BetFactory.create(data, matchExisted, oddsRecord));
            }
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const bets = id && (await this.betsRepository.bets.findOne({
                where: { id: id },
                relations: { match: true }
            }));
            if (bets) {
                return await this.betsRepository.bets.update(bet_factory_1.BetFactory.update(bets, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.editbets');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const bets = await this.betsRepository.bets.findOne({
                where: { id: id },
                relations: { match: true }
            });
            if (bets) {
                return await this.betsRepository.bets.remove(bets).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.remove');
            return false;
        }
    }
};
BetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_abstract_1.IBetRepository,
        domain_2.IMatchRepository])
], BetService);
exports.BetService = BetService;
//# sourceMappingURL=bet.service.js.map