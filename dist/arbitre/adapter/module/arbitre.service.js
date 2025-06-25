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
exports.ArbitreService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const arbitre_factory_1 = require("../arbitre.factory");
let ArbitreService = class ArbitreService {
    constructor(arbitresRepository) {
        this.arbitresRepository = arbitresRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.arbitresRepository.arbitres.find({
                relations: { matchs: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::arbitresService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const arbitres = await this.arbitresRepository.arbitres.findOne({
                where: { id: id },
                relations: { matchs: true }
            });
            if (arbitres) {
                return arbitres;
            }
            throw new common_1.NotFoundException('arbitres not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::arbitresService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.arbitresRepository.arbitres.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { name } = data;
            const existed = await this.arbitresRepository.arbitres.findOneBy({ name });
            if (existed)
                throw new common_1.ConflictException('arbitres already exist');
            return await this.arbitresRepository.arbitres.create(await arbitre_factory_1.ArbitreFactory.create(data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::arbitreservice.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const arbitres = id && (await this.arbitresRepository.arbitres.findOne({
                where: { id: id },
                relations: { matchs: true }
            }));
            if (arbitres) {
                return await this.arbitresRepository.arbitres.update(arbitre_factory_1.ArbitreFactory.update(arbitres, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::arbitreservice.editarbitres');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const arbitres = await this.arbitresRepository.arbitres.findOne({
                where: { id: id },
                relations: { matchs: true }
            });
            if (arbitres) {
                return await this.arbitresRepository.arbitres.remove(arbitres).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::arbitreservice.remove');
            return false;
        }
    }
};
ArbitreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IArbitreRepository])
], ArbitreService);
exports.ArbitreService = ArbitreService;
//# sourceMappingURL=arbitre.service.js.map