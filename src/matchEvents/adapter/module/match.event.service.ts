import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IMatchRepository,
  Match,
  MatchState,
  MatchType,
} from '../../../match/domain';
import { ITeamRepository } from '../../../team/domain';
import { IPlayerRepository } from '../../../player/domain';
import { MatchEventDTO, UpdateMatchEventDto } from '../dto';
import { IMatchEventRepository, MatchEvent } from '../../../matchEvents/domain';
import { IMatchEventService } from '../../../matchEvents/app/module';
import { MatchEventFactory } from '../match.events.factory';

@Injectable()
export class MatchEventService implements IMatchEventService {
  private readonly logger = new Logger();
  constructor(
    private eventRepository: IMatchEventRepository,
    private teamRepository: ITeamRepository,
    private playerRepository: IPlayerRepository,
    private matchRepository: IMatchRepository,
  ) {}

  async fetchAll(): Promise<MatchEvent[]> {
    try {
      return await this.eventRepository.events.find({
        relations: { match: true, joueur: true, equipe: true },
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<MatchEvent> {
    try {
      const match = await this.eventRepository.events.findOne({
        where: { id: id },
        relations: { match: true, joueur: true, equipe: true },
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

  async search(data: Partial<MatchEvent>): Promise<MatchEvent> {
    return await this.eventRepository.events.findOneBy({ ...data });
  }

  async add(data: MatchEventDTO): Promise<MatchEvent> {
    try {
      const { type, equipe, joueur, minute, match } = data;

      const newMatch = await this.matchRepository.matchs.findOne({
        where: { id: match },
        relations: { poule: true, arbitres: true, events: true },
      });

      const team = await this.teamRepository.teams.findOne({
        where: { id: equipe },
        relations: { poule: true },
      });

      const player = await this.playerRepository.players.findOne({
        where: { id: joueur },
        relations: { team: true },
      });

      if (!match) {
        throw new NotFoundException('Match non trouvé');
      }
      if (!team) {
        throw new NotFoundException('Equipe non trouvée');
      }
      if (!player) {
        throw new NotFoundException('Jopueur non trouvé');
      }

      return await this.eventRepository.events.create(
        await MatchEventFactory.create(data, team, player, newMatch),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.add');
      throw error;
    }
  }

  async edit(data: UpdateMatchEventDto): Promise<MatchEvent> {
    try {
      const events = new MatchEvent();
      return events;
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
      const match = await this.eventRepository.events.findOne({
        where: { id: id },
      });
      if (match) {
        return await this.eventRepository.events.remove(match).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.remove');
      return false;
    }
  }
}
