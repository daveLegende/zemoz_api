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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const player_factory_1 = require("../player.factory");
const domain_2 = require("../../../team/domain");
let PlayerService = class PlayerService {
    constructor(playerRepository, teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.playerRepository.players.find({
                relations: { team: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::playerService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const player = await this.playerRepository.players.findOne({
                where: { id: id },
                relations: { team: true }
            });
            if (player) {
                return player;
            }
            throw new common_1.NotFoundException('Player not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PlayerService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.playerRepository.players.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { phone, team } = data;
            const existed = await this.playerRepository.players.findOne({
                where: { phone: phone },
                relations: { team: true }
            });
            if (existed)
                throw new common_1.ConflictException('Player already exist');
            const equipe = await this.teamRepository.teams.findOneByID(team);
            return await this.playerRepository.players.create(await player_factory_1.PlayerFactory.create(data, equipe));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PlayerService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const player = id && (await this.playerRepository.players.findOne({
                where: { id: id },
                relations: { team: true }
            }));
            if (player) {
                return await this.playerRepository.players.update(player_factory_1.PlayerFactory.update(player, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PlayerService.editPlayer');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const player = await this.playerRepository.players.findOne({
                where: { id: id },
                relations: { team: true }
            });
            if (player) {
                return await this.playerRepository.players.remove(player).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::PlayerService.remove');
            return false;
        }
    }
};
PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.IPlayerRepository,
        domain_2.ITeamRepository])
], PlayerService);
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map