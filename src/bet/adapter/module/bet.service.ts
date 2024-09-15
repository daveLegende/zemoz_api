import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBetService } from 'src/bet/app/module';
import { Bet, CategoryName } from 'src/bet/domain';
import { BetAccountDto, UpdateBetDTO } from '../dto';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { IMatchRepository } from 'src/match/domain';
import { BetFactory } from '../bet.factory';

@Injectable()
export class BetService implements IBetService {
  private readonly logger = new Logger();
  constructor(
    private betsRepository: IBetRepository,
    private matchRepository: IMatchRepository
  ) {}

  async fetchAll(): Promise<Bet[]> {
    try {
      return await this.betsRepository.bets.find({
        relations: { match: true }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betsService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Bet> {
    try {
      const bets = await this.betsRepository.bets.findOne({
        where: { id: id },
        relations: { match: true }
      });
      if (bets) {
        return bets;
      }
      throw new NotFoundException('bets not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betsService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Bet>): Promise<Bet> {
    return await this.betsRepository.bets.findOneBy({ ...data });
  }

  async add(data: BetAccountDto): Promise<Bet> {
    try {
      const { category, match, odds } = data;

      console.log(odds);
      

      if (odds === null) {
        throw new NotFoundException("odds not found")
      } else {
        const matchExisted = await this.matchRepository.matchs.findOneByID(match);
        if(!matchExisted) throw new NotFoundException("Match non trouvé")

        let oddsRecord: Record<string, number> = {};

        if (category === CategoryName.VICTOIRE || category === CategoryName.CARTON_JAUNE) {
          // Convertir OddsDto en Record<string, number>
          oddsRecord = {
            V1: odds.V1,
            V2: odds.V2,
            X: odds.X,
          };
        } else {
          oddsRecord = {
            OUI: odds.OUI,
            NON: odds.NON,
          };
        }

        const existed = await this.betsRepository.bets.findOne({
          where: {
            category: category,
            match: matchExisted,
          }
        });
        if (existed)
          throw new ConflictException('bets already exist');

        return await this.betsRepository.bets.create(
          await BetFactory.create(data, matchExisted, oddsRecord),
        );
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.add');
      throw error;
    }
  }

  async edit(data: UpdateBetDTO): Promise<Bet> {
    try {
      const { id } = data;
      const bets = id && (await this.betsRepository.bets.findOne({
        where: { id: id },
        relations: { match: true }
      }));
      if (bets) {
        return await this.betsRepository.bets.update(
          BetFactory.update(bets, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.editbets');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const bets = await this.betsRepository.bets.findOne({
        where: { id: id },
        relations: { match: true }
      });
      if (bets) {
        return await this.betsRepository.bets.remove(bets).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.remove');
      return false;
    }
  }
}
