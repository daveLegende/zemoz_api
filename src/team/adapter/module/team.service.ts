import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { ITeamService } from 'src/team/app/module';
import { ITeamRepository, Team } from 'src/team/domain';
import { TeamAccoutDTO, UpdateTeamDTO } from '../dto';
import { TeamFactory } from '../team.factory';
import { PlayerFactory } from 'src/player/adapter/player.factory';
import { PlayerAccoutDTO } from 'src/player/adapter/dto';
import { IPlayerRepository } from 'src/player/domain';
  
  @Injectable()
  export class TeamService implements ITeamService {
    private readonly logger = new Logger();
    constructor(private teamRepository: ITeamRepository, private playerRepository: IPlayerRepository) {}
  
    async fetchAll(): Promise<Team[]> {
      try {
        return await this.teamRepository.teams.find({
          relations: { joueurs: true, poule: true }
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Team> {
      try {
        const team = await this.teamRepository.teams.findOne(
          {
            where: { id: id },
            relations: { poule: true, joueurs: true }
          }
        );
        if (team) {
          return team;
        }
        throw new NotFoundException('Team not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Team>): Promise<Team> {
      return await this.teamRepository.teams.findOneBy({ ...data });
    }
  
    async add(data: TeamAccoutDTO): Promise<Team> {
      try {
        const { name, joueurs } = data; // Assurez-vous que 'joueurs' est extrait des données.
        const existed = await this.teamRepository.teams.findOneBy({ name });
        if (existed) throw new ConflictException('Team already exist');
        
        const team = await this.teamRepository.teams.create(
          await TeamFactory.create(data),
        );

        console.log(team);
        
        // Une fois l'équipe enregistrée, enregistrer les joueurs
        if (joueurs && joueurs.length > 0) {
          for (let joueur of joueurs) {
            const playerDTO = new PlayerAccoutDTO();
  
            playerDTO.firstname = joueur.firstname;
            playerDTO.lastname = joueur.lastname;
            playerDTO.age = joueur.age;
            playerDTO.phone = joueur.phone;
            playerDTO.buts = joueur.buts;
            playerDTO.passes = joueur.passes;
            playerDTO.team = team.id;  // Utilisation de l'ID de l'équipe nouvellement créée
            playerDTO.avatar = joueur.avatar;
  
            await this.playerRepository.players.create(
              await PlayerFactory.create(playerDTO, team),
            );
          }
        }

        return team;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.add');
        throw error;
      }
    }
  
    async edit(data: UpdateTeamDTO): Promise<Team> {
      try {
        const { id } = data;
        const team = id && (await this.teamRepository.teams.findOne(
          {
            where: { id: id },
            relations: { poule: true, joueurs: true }
          }
        ));
        if (team) {
          return await this.teamRepository.teams.update(
            TeamFactory.update(team, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.editTeam');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const team = await this.teamRepository.teams.findOne(
          {
            where: { id: id },
            relations: { poule: true, joueurs: true }
          }
        );
        if (team) {
          return await this.teamRepository.teams.remove(team).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.remove');
        return false;
      }
    }
  }
  