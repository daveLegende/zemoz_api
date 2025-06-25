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
exports.TournoiService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const tournoi_factory_1 = require("../tournoi.factory");
let TournoiService = class TournoiService {
    constructor(tournoiRepository) {
        this.tournoiRepository = tournoiRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.tournoiRepository.tournois.find();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TournoiService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const tournoi = await this.tournoiRepository.tournois.findOne({
                where: { id: id },
            });
            if (tournoi) {
                return tournoi;
            }
            throw new common_1.NotFoundException('Tournoi not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TournoiService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.tournoiRepository.tournois.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { name, editionName, edition, annee } = data;
            const existed = await this.tournoiRepository.tournois.findOneBy({ name });
            if (existed)
                throw new common_1.ConflictException('Tournoi already exist');
            const tournoi = await this.tournoiRepository.tournois.create(await tournoi_factory_1.TournoiFactory.create(data));
            console.log(tournoi);
            return tournoi;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TournoiService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const tournoi = id && (await this.tournoiRepository.tournois.findOne({
                where: { id: id },
            }));
            if (tournoi) {
                return await this.tournoiRepository.tournois.update(tournoi_factory_1.TournoiFactory.update(tournoi, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TournoiService.editTournoi');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const tournoi = await this.tournoiRepository.tournois.findOne({
                where: { id: id },
            });
            if (tournoi) {
                return await this.tournoiRepository.tournois.remove(tournoi).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TournoiService.remove');
            return false;
        }
    }
};
TournoiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.ITournoiRepository])
], TournoiService);
exports.TournoiService = TournoiService;
//# sourceMappingURL=tournoi.service.js.map