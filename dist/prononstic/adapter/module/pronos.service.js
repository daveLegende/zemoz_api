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
exports.PrononsticService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const domain_2 = require("../../../user/domain");
const domain_3 = require("../../../match/domain");
const pronos_factory_1 = require("../pronos.factory");
let PrononsticService = class PrononsticService {
    constructor(pronosRepository, userRepository, matchRepository) {
        this.pronosRepository = pronosRepository;
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.pronosRepository.pronos.find({
                relations: { match: true, user: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PronosService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const pronos = await this.pronosRepository.pronos.findOne({
                where: { id: id },
                relations: { match: true, user: true }
            });
            if (pronos) {
                return pronos;
            }
            throw new common_1.NotFoundException('Pronos not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PronoService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.pronosRepository.pronos.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { user, match, date, homeScore, awayScore } = data;
            const existUser = await this.userRepository.users.findOneByID(user);
            const existMatch = await this.matchRepository.matchs.findOneByID(match);
            if (!existMatch || !existUser) {
                throw new common_1.NotFoundException("User or Match not found");
            }
            const existed = await this.pronosRepository.pronos.findOne({
                where: { user: existUser, match: existMatch }
            });
            if (existed)
                throw new common_1.ConflictException('Prononstic already exist');
            const prononstic = await this.pronosRepository.pronos.create(await pronos_factory_1.PrononsticFactory.create(data, existUser, existMatch));
            return prononstic;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PronoService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const prono = id && (await this.pronosRepository.pronos.findOne({
                where: { id: id },
                relations: { user: true, match: true }
            }));
            if (prono) {
                return await this.pronosRepository.pronos.update(pronos_factory_1.PrononsticFactory.update(prono, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PronoService.editTeam');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const pronos = await this.pronosRepository.pronos.findOne({
                where: { id: id },
                relations: { user: true, match: true }
            });
            if (pronos) {
                return await this.pronosRepository.pronos.remove(pronos).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PronoService.remove');
            return false;
        }
    }
};
PrononsticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IPronosRepository,
        domain_2.IUserRepository,
        domain_3.IMatchRepository])
], PrononsticService);
exports.PrononsticService = PrononsticService;
//# sourceMappingURL=pronos.service.js.map