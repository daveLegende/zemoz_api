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
exports.ParisService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../../match/domain");
const domain_2 = require("../../domain");
const data_abstract_1 = require("../../domain/data.abstract");
const domain_3 = require("../../../user/domain");
const paris_factory_1 = require("../paris.factory");
let ParisService = class ParisService {
    constructor(parisRepository, userRepository, matchRepository) {
        this.parisRepository = parisRepository;
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.parisRepository.paris.find({
                relations: { match: true, user: true, }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betsService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const bets = await this.parisRepository.paris.findOne({
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
        return await this.parisRepository.paris.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { match, user, odd, type, potentialGain, amount } = data;
            if (type === null) {
                throw new common_1.NotFoundException("odds not found");
            }
            else {
                const matchExisted = await this.matchRepository.matchs.findOneByID(match);
                if (!matchExisted)
                    throw new common_1.NotFoundException("Match non trouvé");
                const userExisted = await this.userRepository.users.findOneByID(user);
                if (!userExisted)
                    throw new common_1.NotFoundException("Utilisateur non trouvé");
                if (userExisted.solde < amount) {
                    throw new common_1.NotFoundException("Solde utilisateur insuffisant");
                }
                const currentOdd = matchExisted.odds[type];
                const paris = new domain_2.Paris();
                paris.match = matchExisted;
                paris.type = type;
                paris.odd = currentOdd;
                paris.amount = amount;
                paris.user = userExisted;
                paris.potentialGain = amount * currentOdd;
                userExisted.solde -= amount;
                await this.userRepository.users.update(userExisted);
                return await this.parisRepository.paris.create(await paris_factory_1.ParisFactory.create(data, matchExisted, userExisted));
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
            const bets = id && (await this.parisRepository.paris.findOne({
                where: { id: id },
                relations: { match: true }
            }));
            if (bets) {
                return await this.parisRepository.paris.update(paris_factory_1.ParisFactory.update(bets, data, bets.match, bets.user));
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
            const bets = await this.parisRepository.paris.findOne({
                where: { id: id },
                relations: { match: true, user: true, }
            });
            if (bets) {
                return await this.parisRepository.paris.remove(bets).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.remove');
            return false;
        }
    }
    async getPendingParisForMatch(id) {
        try {
            const match = await this.matchRepository.matchs.findOneByID(id);
            if (!match)
                throw new common_1.NotFoundException("Aucun match trouvé avec cet ID");
            const paris = await this.parisRepository.paris.find({
                where: { match: { id: id } },
                relations: { match: true, user: true, }
            });
            if (paris.length > 0) {
                return paris;
            }
            else {
                return [];
            }
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.remove');
            throw error;
        }
    }
    async updateParisStatus(id) {
        try {
            const match = await this.matchRepository.matchs.findOneByID(id);
            if (!match)
                throw new common_1.NotFoundException("Aucun match trouvé avec cet ID");
            const paris = await this.parisRepository.paris.find({
                where: { match: { id: id } },
                relations: { match: true, user: true, }
            });
            if (paris.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::betservice.remove');
            throw error;
        }
    }
};
ParisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_abstract_1.IParisRepository,
        domain_3.IUserRepository,
        domain_1.IMatchRepository])
], ParisService);
exports.ParisService = ParisService;
//# sourceMappingURL=paris.service.js.map