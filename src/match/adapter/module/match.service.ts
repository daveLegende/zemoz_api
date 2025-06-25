import {
  BadRequestException,
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IMatchService } from 'src/match/app/module';
import { EventType, IMatchRepository, Match, MatchState, MatchType } from 'src/match/domain';
import { MatchAccoutDTO, UpdateMatchDTO, UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { MatchFactory } from '../match.factory';
import { IArbitreRepository } from 'src/arbitre/domain';
import { ITeamRepository } from 'src/team/domain';
import { IPouleRepository, Poule } from 'src/poule/domain';
import { IPlayerRepository } from 'src/player/domain';
import { IMatchEventRepository, MatchEvent } from 'src/matchEvents/domain';
import { MatchEventFactory } from 'src/matchEvents/adapter/match.events.factory';
import { MatchGateway } from './match.gateway';
  
  @Injectable()
  export class MatchService implements IMatchService {
    private readonly logger = new Logger();
    constructor(
      private matchRepository: IMatchRepository, 
      private arbitreRepository: IArbitreRepository,
      private teamRepository: ITeamRepository,
      private pouleRepository: IPouleRepository,
      private playerRepository: IPlayerRepository,
      private eventRepository: IMatchEventRepository,
      // 
      @Inject(forwardRef(() => MatchGateway)) // Injection du Gateway
      private readonly matchGateway: MatchGateway,

    ) {}
  
    async fetchAll(): Promise<Match[]> {
      try {
        return await this.matchRepository.matchs.find({ 
          relations: { 
            home: true, 
            away: true, 
            arbitres: true, 
            events: { joueur: true, equipe: true }, 
          bets: { match: {home: true, away: true} } 
        } 
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Match> {
      try {
        const match = await this.matchRepository.matchs.findOne({
          where: { id: id },
          relations: { 
            home: true, 
            away: true, 
            arbitres: true, 
            bets: { match: true } , 
            events: { joueur: true, equipe: true } 
          }
        });
        if (match) {
          // const referee = await this.arbitreRepository.arbitres.findByIds(match.arbitres);
          // const domicile = await this.teamRepository.teams.findOneByID(match.home.id);
          // const exterieure = await this.teamRepository.teams.findOneByID(match.away.id);

        
          return match;
        }
        throw new NotFoundException('Match not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Match>): Promise<Match> {
      return await this.matchRepository.matchs.findOneBy({ ...data });
    }
  
    async add(data: MatchAccoutDTO): Promise<Match> {
      try {

        console.log('Données reçues :', data); // `data` étant l'objet JSON reçu par l'API

        const { away, home, arbitres, type, odds, poule } = data;
        // const existed = await this.matchRepository.matchs.findOne({ where: {
        //   home: home,
        //   away: away,
        // }, });
        // if (existed)
        //   throw new ConflictException('Match already exist');
        console.log("referee   ----------------"+data);

        const referee = await this.arbitreRepository.arbitres.findByIds(arbitres);
        
        const domicile = await this.teamRepository.teams.findOne({
          where: { id: home },
          relations: { poule: true }
        });
        const exterieure = await this.teamRepository.teams.findOne({
          where: { id: away },
          relations: { poule: true }
        });
        console.log("referee   ----------------"+data.home);

        if (!domicile || !exterieure) {
          throw new NotFoundException('L\'une des équipes spécifiées est introuvable.');
        }

        if(type === MatchType.POULE) {
          if (!domicile.poule || !exterieure.poule) {
            throw new NotFoundException("L'une des équipes n'a pas de poule associée.");
          }else {
            if (domicile.poule.id === exterieure.poule.id) {
              const match = await this.matchRepository.matchs.create(
                await MatchFactory.create(data, referee, domicile, exterieure, domicile.poule),
              );
      
               // Utilisez save pour persister le match avec toutes ses relations
              return await this.matchRepository.save(match);
            } else {
              throw new NotFoundException("Les équipes ne sont pas dans la même poule", 'ERROR::MatchService.editMatch');
            }
          }
        } else {
          const match = await this.matchRepository.matchs.create(
            await MatchFactory.create(data, referee, domicile, exterieure, null),
          );
          return await this.matchRepository.save(match);
        };
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.add');
        throw error;
      }
    }
  
    async edit(data: UpdateMatchDTO): Promise<Match> {
      try {
        const { id, home, away, arbitres, date, type } = data;
        const match = id && (await this.matchRepository.matchs.findOne({
          where: { id: id },
          relations: { home: true, away: true, arbitres: true, poule: true, events: { joueur: true, equipe: true } }
        }));

        if (match) {
          const domicile = await this.teamRepository.teams.findOne({
            where: { id: home },
            relations: { poule: true }
          });
          const exterieure = await this.teamRepository.teams.findOne({
            where: { id: away },
            relations: { poule: true }
          });

          const referee = await this.arbitreRepository.arbitres.findByIds(arbitres);

          return await this.matchRepository.matchs.update(
            MatchFactory.update(match, data, referee, domicile, exterieure),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.editMatch');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const match = await this.matchRepository.matchs.findOne(({
          where: { id: id },
          relations: { home: true, away: true, arbitres: true, poule: true, events: { joueur: true, equipe: true } }
        }));
        if (match) {
          return await this.matchRepository.matchs.remove(match).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.remove');
        return false;
      }
    }

    // wrb socket 
    async updateScore(data: UpdateMatchScoreEventDto) {
      try {
        const { id, homeScore, awayScore, eventType, teamId, playerId, minuite } = data;
        if (minuite === undefined || minuite === null) {
          throw new BadRequestException('Minute must be provided');
        }

        const match = await this.matchRepository.matchs.findOne({
          where: { id: id },
          relations: { home: true, away: true, arbitres: true, events: { joueur: true, equipe: true } }
        });

        const home = await this.teamRepository.teams.findOne({
          where: { id: match.home.id },
          relations: { poule: true }
        });
        const away = await this.teamRepository.teams.findOne({
          where: { id: match.away.id },
          relations: { poule: true }
        });

        const player = await this.playerRepository.players.findOne({
          where: { id: playerId },
          relations: { team: true }
        }); 
        const events = new MatchEvent();

        if (!match) {
          throw new NotFoundException();
        }

        if (eventType === EventType.BUT) {
          if (home.id === teamId) {
            match.scores.home = homeScore ?? match.scores.home;
            events.equipe = home;
            player.buts += 1;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          } else {
            match.scores.away = awayScore ?? match.scores.away;
            events.equipe = away;
            player.buts += 1;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          }
        } else if(eventType === EventType.CARTON_JAUNE) {
          if (home.id === teamId) {
            events.equipe = home;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          } else {
            match.scores.away = awayScore ?? match.scores.away;
            events.equipe = away;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          }
        } else {
          if (home.id === teamId) {
            events.equipe = home;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          } else {
            match.scores.away = awayScore ?? match.scores.away;
            events.equipe = away;
            events.joueur = player;
            events.type = eventType;
            events.minute = minuite;
            match.events = [...match.events, events];
          }
        }

        await this.playerRepository.players.update(player);
        const matchUpdated = await this.matchRepository.matchs.update(
          MatchFactory.updateScore(match, data),
        );

        // Émission de l'événement à tous les clients via le Gateway
        this.matchGateway.server.emit('scoreUpdated', matchUpdated);

        return matchUpdated;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.updateScore');
        throw error;
      }
    }

    // web socket add
    async updateState(data: UpdateStateDto) {
      try {
        const { id, etat } = data;

        // Récupération du match
        const match = await this.matchRepository.matchs.findOne({
          where: { id: id },
          relations: { home: true, away: true, arbitres: true, poule: true, events: true },
        });

        if (!match) {
          throw new NotFoundException('Match not found');
        }

        // Récupération des équipes
        const home = await this.teamRepository.teams.findOne({
          where: { id: match.home.id },
          relations: { poule: true },
        });

        const away = await this.teamRepository.teams.findOne({
          where: { id: match.away.id },
          relations: { poule: true },
        });

        // Vérifier l'état actuel du match et mettre à jour si nécessaire
        if (match.etat === MatchState.A_VENIR) {
          match.etat = MatchState.EN_COURS;
        } else if (match.etat === MatchState.EN_COURS) {
          match.etat = MatchState.TERMINER;

          // Mise à jour des statistiques des équipes
          home.butMarques += match.scores.home;
          home.butConcedes += match.scores.away;
          away.butMarques += match.scores.away;
          away.butConcedes += match.scores.home;

          home.matchJoues += 1;
          away.matchJoues += 1;

          // Mise à jour des points en fonction des scores
          if (match.poule) {
            if (match.scores.home > match.scores.away) {
              home.points += 3;
            } else if (match.scores.home < match.scores.away) {
              away.points += 3;
            } else {
              home.points += 1;
              away.points += 1;
            }
          }

          // Gestion de la prolongation et qualification en PHASE FINALE
          if (match.type === MatchType.HUITIEME || match.type === MatchType.QUART || match.type === MatchType.DEMI || match.type === MatchType.FINALE) {
            if (match.scores.home === match.scores.away) {
                match.isProlongation = true;
                match.teamQualify = null; // Pas encore de qualifié
            } else {
                match.isProlongation = false;
                match.teamQualify = match.scores.home > match.scores.away ? match.home.id : match.away.id;
            }
          }

          // Mise à jour des équipes dans la base de données
          await this.teamRepository.teams.update(home);
          await this.teamRepository.teams.update(away);  // Correction de `home` à `away`
        }

        // Mise à jour du match dans la base de données
        return await this.matchRepository.matchs.update(
          MatchFactory.updateState(match, data),
        );

      } catch (error) {
        this.logger.error(error.message, 'ERROR::MatchService.updateState');
        throw error;
      }
    }
  }
  