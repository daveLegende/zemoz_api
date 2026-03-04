import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBetService } from '../../../bet/app/module';
import { Bet, CategoryName, MarketType } from '../../../bet/domain';
import { BetAccountDto, UpdateBetDTO } from '../dto';
import { IBetRepository } from '../../../bet/domain/data.abstract';
import { IMatchRepository, Match } from '../../../match/domain';
import { BetFactory } from '../bet.factory';
import { MARKET_CONFIG } from '../../../bet/domain/bet.mapping';
import { isUUID } from 'class-validator';

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
      // Validation métier centrale
      this.validateBet(data);

      const config = MARKET_CONFIG[data.category];

      // 2️⃣ Charger match / competition si nécessaire
      let match: Match = null;

      if (config.requiresMatch) {
        match = await this.matchRepository.matchs.findOneByID(data.matchId);
        if (!match) {
          throw new NotFoundException('Match non trouvé');
        }
      }

      // 3️⃣ Vérifier unicité du market
      const existed = await this.betsRepository.bets.findOne({
        where: {
          category: data.category,
          match: match ?? null,
          competitionId: data.competitionId ?? null,
        },
      });

      if (existed) {
        throw new ConflictException(
          'Ce marché existe déjà pour ce match / compétition'
        );
      }

      // 4️⃣ Création du bet
      const bet = BetFactory.create({
        category: data.category,
        odds: data.odds.odds,
        match,
        competitionId: data.competitionId,
      });

      return await this.betsRepository.bets.create(bet);

    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.add');
      throw error;
    }
  }



  async edit(data: UpdateBetDTO): Promise<Bet> {
    try {
      const { id, odds } = data;

      const bet = await this.betsRepository.bets.findOne({
        where: { id },
        relations: { match: true },
      });

      if (!bet) {
        throw new NotFoundException('Bet introuvable');
      }

      if (!odds?.odds) {
        throw new BadRequestException('Cotes requises pour la mise à jour');
      }

      // 🔥 Validation métier avec données existantes
      this.validateBet({
        category: bet.category,
        matchId: bet.match?.id,
        competitionId: bet.competitionId,
        odds,
      });

      const updated = BetFactory.update(bet, odds.odds);

      return await this.betsRepository.bets.update(updated);

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


  validateBet(dto: BetAccountDto) {
    const config = MARKET_CONFIG[dto.category];

    if (config.requiresMatch && !dto.matchId) {
      throw new BadRequestException("Match requis pour ce pari");
    }

    if (config.requiresCompetition && !dto.competitionId) {
      throw new BadRequestException("Compétition requise");
    }

    // Validation des options
    switch (config.marketType) {
      case MarketType.ONE_X_TWO:
        this.assertKeys(dto.odds.odds, ['V1', 'X', 'V2']);
        break;

      case MarketType.YES_NO:
        this.assertKeys(dto.odds.odds, ['OUI', 'NON']);
        break;

      case MarketType.PLAYERS:
        this.assertUUIDKeys(dto.odds.odds);
        break;

      case MarketType.TEAMS:
        this.assertUUIDKeys(dto.odds.odds);
        break;
    }
  }

  
  private assertKeys(
    odds: Record<string, number>,
    allowedKeys: string[]
  ) {
    if (!odds || typeof odds !== 'object') {
      throw new BadRequestException('Cotes invalides');
    }

    const keys = Object.keys(odds);

    // Clés manquantes
    const missingKeys = allowedKeys.filter(k => !keys.includes(k));
    if (missingKeys.length > 0) {
      throw new BadRequestException(
        `Options manquantes: ${missingKeys.join(', ')}`
      );
    }

    // Clés interdites
    const invalidKeys = keys.filter(k => !allowedKeys.includes(k));
    if (invalidKeys.length > 0) {
      throw new BadRequestException(
        `Options invalides: ${invalidKeys.join(', ')}`
      );
    }

    // Valeurs des cotes
    for (const key of keys) {
      const value = odds[key];
      if (typeof value !== 'number' || value <= 1) {
        throw new BadRequestException(
          `Cote invalide pour ${key}`
        );
      }
    }
  }

  private assertUUIDKeys(odds: Record<string, number>) {
    if (!odds || typeof odds !== 'object') {
      throw new BadRequestException('Cotes invalides');
    }

    const keys = Object.keys(odds);

    if (keys.length === 0) {
      throw new BadRequestException('Aucune option fournie');
    }

    for (const key of keys) {
      if (!isUUID(key)) {
        throw new BadRequestException(
          `Clé invalide (UUID attendu): ${key}`
        );
      }

      const value = odds[key];
      if (typeof value !== 'number' || value <= 1) {
        throw new BadRequestException(
          `Cote invalide pour ${key}`
        );
      }
    }
  }



}
