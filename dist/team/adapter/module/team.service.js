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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const team_factory_1 = require("../team.factory");
const player_factory_1 = require("../../../player/adapter/player.factory");
const dto_1 = require("../../../player/adapter/dto");
const domain_2 = require("../../../player/domain");
let TeamService = class TeamService {
    constructor(teamRepository, playerRepository) {
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.teamRepository.teams.find({
                relations: { joueurs: true, poule: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TeamService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const team = await this.teamRepository.teams.findOne({
                where: { id: id },
                relations: { poule: true, joueurs: true }
            });
            if (team) {
                return team;
            }
            throw new common_1.NotFoundException('Team not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TeamService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.teamRepository.teams.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { name, joueurs } = data;
            const existed = await this.teamRepository.teams.findOneBy({ name });
            if (existed)
                throw new common_1.ConflictException('Team already exist');
            const team = await this.teamRepository.teams.create(await team_factory_1.TeamFactory.create(data));
            console.log(team);
            if (joueurs && joueurs.length > 0) {
                for (let joueur of joueurs) {
                    const playerDTO = new dto_1.PlayerAccoutDTO();
                    playerDTO.firstname = joueur.firstname;
                    playerDTO.lastname = joueur.lastname;
                    playerDTO.age = joueur.age;
                    playerDTO.phone = joueur.phone;
                    playerDTO.buts = joueur.buts;
                    playerDTO.passes = joueur.passes;
                    playerDTO.team = team.id;
                    playerDTO.avatar = joueur.avatar;
                    await this.playerRepository.players.create(await player_factory_1.PlayerFactory.create(playerDTO, team));
                }
            }
            return team;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TeamService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id } = data;
            const team = id && (await this.teamRepository.teams.findOne({
                where: { id: id },
                relations: { poule: true, joueurs: true }
            }));
            if (team) {
                return await this.teamRepository.teams.update(team_factory_1.TeamFactory.update(team, data));
            }
            throw new common_1.NotFoundException();
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TeamService.editTeam');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const Team = await this.teamRepository.teams.findOne({
                where: { id: id },
                relations: { poule: true, joueurs: true }
            });
            if (Team) {
                return await this.teamRepository.teams.remove(Team).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TeamService.remove');
            return false;
        }
    }
};
TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.ITeamRepository, domain_2.IPlayerRepository])
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map