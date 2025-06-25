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
exports.PouleService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const poule_factory_1 = require("../poule.factory");
const domain_2 = require("../../../team/domain");
let PouleService = class PouleService {
    constructor(pouleRepository, teamRepository) {
        this.pouleRepository = pouleRepository;
        this.teamRepository = teamRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.pouleRepository.poules.find({
                relations: {
                    equipes: true
                }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PouleService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const poule = await this.pouleRepository.poules.findOneByID(id);
            if (poule) {
                return poule;
            }
            throw new common_1.NotFoundException('Poule not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PouleService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.pouleRepository.poules.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { name, equipes } = data;
            const existed = await this.pouleRepository.poules.findOneBy({ name });
            if (existed)
                throw new common_1.ConflictException('Poule already exist');
            const team = await this.teamRepository.teams.findByIds(equipes);
            return await this.pouleRepository.poules.create(await poule_factory_1.PouleFactory.create(data, team));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PouleService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const poule = id && (await this.pouleRepository.poules.findOneByID(id));
            if (poule) {
                return await this.pouleRepository.poules.update(poule_factory_1.PouleFactory.update(poule, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PouleService.editPoule');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const poule = await this.pouleRepository.poules.findOneByID(id);
            if (poule) {
                return await this.pouleRepository.poules.remove(poule).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PouleService.remove');
            return false;
        }
    }
};
PouleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IPouleRepository,
        domain_2.ITeamRepository])
], PouleService);
exports.PouleService = PouleService;
//# sourceMappingURL=poule.service.js.map