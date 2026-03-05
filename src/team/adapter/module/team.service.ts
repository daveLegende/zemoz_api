import {
    ConflictException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { ITeamService } from '../../app/module';
import { ITeamRepository, Team } from '../../domain';
import { TeamAccoutDTO, UpdateTeamDTO } from '../dto';
import { TeamFactory } from '../team.factory';
import { PlayerFactory } from '../../../player/adapter/player.factory';
import { PlayerAccoutDTO } from '../../../player/adapter/dto';
import { IPlayerRepository } from '../../../player/domain';
import { IFileStorage } from '../../../shared/domain/file-storage.interface';
import { Express } from 'express';


  @Injectable()
  export class TeamService implements ITeamService {
    private readonly logger = new Logger();
    constructor(
      private teamRepository: ITeamRepository,
      private playerRepository: IPlayerRepository,
      @Inject('IFileStorage') private cloudinaryService: IFileStorage,
    ) {}
  
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
          return TeamFactory.getTeam(team);
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
  
    // async add(data: TeamAccoutDTO): Promise<Team> {
    //   try {
    //     const { name, joueurs } = data; // Assurez-vous que 'joueurs' est extrait des données.
    //     const existed = await this.teamRepository.teams.findOneBy({ name });
    //     if (existed) throw new ConflictException('Team already exist');
        
    //     const team = await this.teamRepository.teams.create(
    //       await TeamFactory.create(data),
    //     );

    //     console.log(team);
        
    //     // Une fois l'équipe enregistrée, enregistrer les joueurs
    //     if (joueurs && joueurs.length > 0) {
    //       for (let joueur of joueurs) {
    //         const playerDTO = new PlayerAccoutDTO();
  
    //         playerDTO.firstname = joueur.firstname;
    //         playerDTO.lastname = joueur.lastname;
    //         playerDTO.age = joueur.age;
    //         playerDTO.phone = joueur.phone;
    //         playerDTO.buts = joueur.buts;
    //         playerDTO.passes = joueur.passes;
    //         playerDTO.team = team.id;  // Utilisation de l'ID de l'équipe nouvellement créée
    //         playerDTO.avatar = joueur.avatar;
  
    //         await this.playerRepository.players.create(
    //           await PlayerFactory.create(playerDTO, team),
    //         );
    //       }
    //     }

    //     return team;
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::TeamService.add');
    //     throw error;
    //   }
    // }

    async add(data: TeamAccoutDTO, file?: Express.Multer.File): Promise<Team> {
      console.log('=== SERVICE ADD APPELÉ ===');
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('File reçu:', !!file, file?.originalname, !!file?.buffer);
      try {
        // Upload du logo si un fichier est fourni
        let logoUrl: string | undefined;
        console.log('Fichier reçu:', file.originalname); // Debug
        console.log('Buffer size:', file.buffer?.length); // Debug
        if (file) {
          console.log('Fichier reçu:', file.originalname); // Debug
          console.log('Buffer size:', file.buffer?.length); // Debug
          logoUrl = await this.cloudinaryService.upload(file, 'teams');
          console.log('Uploaded logo URL:', logoUrl);
        }

        const existed = await this.teamRepository.teams.findOneBy({ name: data.name });
        if (existed) throw new ConflictException('Team already exist');

        const team = await this.teamRepository.teams.create(await TeamFactory.create({...data, logo: logoUrl}));

        // Création des joueurs liés
        if (data.joueurs && data.joueurs.length > 0) {
          for (let joueur of data.joueurs) {
            const playerDTO = new PlayerAccoutDTO();
            Object.assign(playerDTO, joueur);
            playerDTO.team = team.id;

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
  
    // async edit(data: UpdateTeamDTO): Promise<Team> {
    //   try {
    //     const { id } = data;
    //     const team = id && (await this.teamRepository.teams.findOne(
    //       {
    //         where: { id: id },
    //         relations: { poule: true, joueurs: true }
    //       }
    //     ));
    //     if (team) {
    //       return await this.teamRepository.teams.update(
    //         TeamFactory.update(team, data),
    //       );
    //     }
    //     throw new NotFoundException();
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::TeamService.editTeam');
  
    //     throw error;
    //   }
    // }

    async edit(data: UpdateTeamDTO, file?: Express.Multer.File): Promise<Team> {
      try {
        const team = await this.teamRepository.teams.findOne({
          where: { id: data.id },
          relations: { poule: true, joueurs: true },
        });
        if (!team) throw new NotFoundException();

        let logoUrl: string | undefined;
        if (file) {
          logoUrl = await this.cloudinaryService.upload(file, 'teams');
        }

        return await this.teamRepository.teams.update(TeamFactory.update(team, { ...data, logo: logoUrl }));
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
        const Team = await this.teamRepository.teams.findOne(
          {
            where: { id: id },
            relations: { poule: true, joueurs: true }
          }
        );
        if (Team) {
          return await this.teamRepository.teams.remove(Team).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.remove');
        return false;
      }
    }
  }
  