import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBetService } from '../../../bet/app/module';
import { Bet, CategoryName, MarketType } from '../../../bet/domain';
import { BetAccountDto, UpdateBetDTO, CreateMultipleBetsDto, UpdateMultipleBetsDTO } from '../dto';
import { IBetRepository } from '../../../bet/domain/data.abstract';
import { IMatchRepository, Match } from '../../../match/domain';
import { BetFactory } from '../bet.factory';
import { MARKET_CONFIG } from '../../../bet/domain/bet.mapping';
import { ITournoiRepository, Tournoi } from '../../../tournoi/domain';
import { isUUID } from 'class-validator';

@Injectable()
export class BetService implements IBetService {
  private readonly logger = new Logger();
  constructor(
    private betsRepository: IBetRepository,
    private matchRepository: IMatchRepository,
    private tournoiRepository: ITournoiRepository
  ) {}

  async fetchAll(): Promise<Bet[]> {
    try {
      return await this.betsRepository.bets.find({
        relations: { match: true, competition: true }
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
        relations: { match: true, competition: true }
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


  // dans bet/service/bet.service.ts
  async addMultiple(data: CreateMultipleBetsDto): Promise<Bet[]> {
    try {
      const { matchId, competitionId, bets } = data;
      
      // 1️⃣ Vérifier que le match existe (si nécessaire)
      let match: Match = null;
      if (matchId) {
        match = await this.matchRepository.matchs.findOneByID(matchId);
        if (!match) {
          throw new NotFoundException('Match non trouvé');
        }
      }

      // 2️⃣ Vérifier que la compétition existe (si nécessaire)
      let competition: Tournoi = null;
      if (competitionId) {
        competition = await this.tournoiRepository.tournois.findOneByID(competitionId);
        if (!competition) {
          throw new NotFoundException('Compétition non trouvée');
        }
      }

      const createdBets: Bet[] = [];

      for (const betData of bets) {
        // Validation métier pour chaque bet
        this.validateBet(betData);

        const config = MARKET_CONFIG[betData.category];

        // Vérifier unicité du market pour ce match
        const existed = await this.betsRepository.bets.find({
          where: {
            category: betData.category,
            match: match ? { id: matchId } : null,
            competition: competition ? { id: competitionId } : null,
          },
        });

        if (existed) {
          throw new ConflictException(
            `Le marché ${betData.category} existe déjà pour ce match / compétition`
          );
        }

        // Création du bet via la factory
        const bet = BetFactory.create({
          category: betData.category,
          odds: betData.odds.odds, // Note: odds.odds à cause de la structure
          match,
          competition,
        });

        const savedBet = await this.betsRepository.bets.create(bet);
        createdBets.push(savedBet);
      }

      return createdBets;

    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.addMultiple');
      throw error;
    }
  }

  async add(data: BetAccountDto): Promise<Bet> {
    try {
      // Validation métier centrale
      this.validateBet(data);

      const config = MARKET_CONFIG[data.category];

      // 2️⃣ Charger match si nécessaire
      let match: Match = null;
      if (config.requiresMatch) {
        match = await this.matchRepository.matchs.findOneByID(data.matchId);
        if (!match) {
          throw new NotFoundException('Match non trouvé');
        }
      }

      // 3️⃣ Charger competition si nécessaire
      let competition: Tournoi = null;
      if (config.requiresCompetition) {
        competition = await this.tournoiRepository.tournois.findOneByID(data.competitionId);
        if (!competition) {
          throw new NotFoundException('Compétition non trouvée');
        }
      }

      // 4️⃣ Vérifier unicité du market
      const existed = await this.betsRepository.bets.findOne({
        where: {
          category: data.category,
          match: match ?? null,
          competition: competition ?? null,
        },
      });

      if (existed) {
        throw new ConflictException(
          'Ce marché existe déjà pour ce match / compétition'
        );
      }

      // 5️⃣ Création du bet
      const bet = BetFactory.create({
        category: data.category,
        odds: data.odds.odds,
        match,
        competition,
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
        relations: { match: true, competition: true },
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
        competitionId: bet.competition?.id,
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
