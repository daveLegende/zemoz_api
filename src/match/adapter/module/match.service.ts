import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IMatchService } from '../../app/module';
import { EventType, HalfPauseState, IMatchRepository, Match, MatchState, MatchType } from '../../domain';
import { MatchAccoutDTO, UpdateMatchDTO, UpdateMatchPenaltyScoreDto, UpdateMatchPenaltyStateDto, UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { MatchFactory } from '../match.factory';
import { IArbitreRepository } from '../../../arbitre/domain';
import { ITeamRepository } from '../../../team/domain';
import { IPouleRepository, Poule } from '../../../poule/domain';
import { IPlayerRepository } from '../../../player/domain';
import { IMatchEventRepository, MatchEvent } from '../../../matchEvents/domain';
import { MatchEventFactory } from '../../../matchEvents/adapter/match.events.factory';
import { MatchGateway } from './match.gateway';
import { ICouponRepository } from '../../../coupon/domain/data.abstract';
import { ICouponBetService } from '../../../couponBet/app/module/coupon_bet.service';
import { CategoryName } from '../../../bet/domain';
import { BetStatus, CouponBet, ICouponBetRepository } from '../../../couponBet/domain';
import { CouponBetFactory } from '../../../couponBet/adapter/coupon_bet.factory';
import { Coupon, CouponState } from '../../../coupon/domain';
import { DataSource } from 'typeorm';
import { CouponEntity } from '../../../coupon/framework/schema/coupon.entity';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';

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
    private couponRepository: ICouponRepository,
    private couponBetService: ICouponBetService,
    private couponBetRepository: ICouponBetRepository,
    private dataSource: DataSource,
    // 
    @Inject(forwardRef(() => MatchGateway)) // Injection du Gateway
    private readonly matchGateway: MatchGateway,

  ) { }

  async fetchAll(): Promise<Match[]> {
    try {
      const matches = await this.matchRepository.matchs.find({
        relations: {
          home: { joueurs: true },
          away: { joueurs: true },
          arbitres: true,
          events: { joueur: true, equipe: true },
          bets: true,
        }
      });
      // Ajouter les URLs complets pour les images
      return matches;
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
          home: { joueurs: true },
          away: { joueurs: true },
          arbitres: true,
          bets: true,
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
      console.log("referee   ----------------" + data);

      const referee = await this.arbitreRepository.arbitres.findByIds(arbitres);

      const domicile = await this.teamRepository.teams.findOne({
        where: { id: home },
        relations: { poule: true }
      });
      const exterieure = await this.teamRepository.teams.findOne({
        where: { id: away },
        relations: { poule: true }
      });
      console.log("referee   ----------------" + data.home);

      if (!domicile || !exterieure) {
        throw new NotFoundException('L\'une des équipes spécifiées est introuvable.');
      }

      if (type === MatchType.POULE) {
        if (!domicile.poule || !exterieure.poule) {
          throw new NotFoundException("L'une des équipes n'a pas de poule associée.");
        } else {
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

  // Méthode utilitaire pour ajouter les URLs complets
  private addFullImageUrls(match: Match): Match {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3333';
    const uploadPath = process.env.UPLOAD_PATH || 'api/v1/files';

    // Traitement des arbitres
    if (match.arbitres && match.arbitres.length > 0) {
      match.arbitres = match.arbitres.map(arbitre => ({
        ...arbitre,
        avatar: arbitre.avatar ? `${baseUrl}/${uploadPath}/${arbitre.avatar}` : null
      }));
    }

    // Traitement de l'équipe à domicile
    if (match.home && match.home.logo) {
      match.home = {
        ...match.home,
        logo: `${baseUrl}/${uploadPath}/${match.home.logo}`
      };
    }

    // Traitement de l'équipe à l'extérieur
    if (match.away && match.away.logo) {
      match.away = {
        ...match.away,
        logo: `${baseUrl}/${uploadPath}/${match.away.logo}`
      };
    }

    return match;
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

  // web socket 
  async updateScore(data: UpdateMatchScoreEventDto) {
    try {
      const { id, homeScore, awayScore, eventType, teamId, playerId, minuite } = data;
      if (minuite === undefined || minuite === null) {
        throw new BadRequestException('Minuite doit être définie');
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
      } else if (eventType === EventType.CARTON_JAUNE) {
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

      await this.checkMatchRelatedCoupons(id);
      // Validation des coupons en temps réel
      await this.checkRealTimeCoupons(match.id, data);

      return matchUpdated;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.updateScore');
      throw error;
    }
  }

  async updateState(data: UpdateStateDto): Promise<Match> {
    try {
      const { id } = data;

      const match = await this.matchRepository.matchs.findOne({
        where: { id: id },
        relations: { home: true, away: true, arbitres: true, poule: true, events: true },
      });

      if (!match) {
        throw new NotFoundException('Match not found');
      }

      const home = await this.teamRepository.teams.findOne({
        where: { id: match.home.id },
        relations: { poule: true },
      });

      const away = await this.teamRepository.teams.findOne({
        where: { id: match.away.id },
        relations: { poule: true },
      });

      if (match.etat === MatchState.A_VENIR) {
        match.etat = MatchState.EN_COURS;
      } else if (match.etat === MatchState.EN_COURS) {
        match.etat = MatchState.TERMINER;

        home.butMarques += match.scores.home;
        home.butConcedes += match.scores.away;
        away.butMarques += match.scores.away;
        away.butConcedes += match.scores.home;

        home.matchJoues += 1;
        away.matchJoues += 1;

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

        if (match.type === MatchType.HUITIEME || match.type === MatchType.QUART ||
          match.type === MatchType.DEMI || match.type === MatchType.FINALE) {
          if (match.scores.home === match.scores.away) {
            match.teamQualify = match.homePenalty > match.awayPenalty ? match.home.id : match.away.id;
          } else {
            match.isProlongation = false;
            match.teamQualify = match.scores.home > match.scores.away ? match.home.id : match.away.id;
          }
        }

        await this.teamRepository.teams.update(home);
        await this.teamRepository.teams.update(away);
      }

      //
      const updatedMatch = await this.matchRepository.matchs.update(
        MatchFactory.updateState(match, data),
      );

      // 
      await this.checkMatchRelatedCoupons(id);
      await this.checkRealTimeCoupons(updatedMatch.id);

      return updatedMatch;

    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.updateState');
      throw error;
    }
  }

  // Fonction pour mettre à jour l'état de mi-temps/pause
  async updateHalfTimeState(id: string, halfPauseState: HalfPauseState): Promise<Match> {
    try {
      const match = await this.matchRepository.matchs.findOne({
        where: { id: id },
        relations: { home: true, away: true, arbitres: true, poule: true }
      });

      if (!match) {
        throw new NotFoundException('Match not found');
      }

      // Validation: On ne peut changer l'état que si le match est en cours
      if (match.etat !== MatchState.EN_COURS) {
        throw new BadRequestException('Le match doit être en cours pour modifier l\'état de mi-temps');
      }

      // Logique de transition d'état
      const currentState = match.halfPauseState || HalfPauseState.FIRST_HALF;

      // Vérification des transitions valides
      const validTransitions = {
        [HalfPauseState.FIRST_HALF]: [HalfPauseState.HALF_TIME],
        [HalfPauseState.HALF_TIME]: [HalfPauseState.SECOND_HALF],
        [HalfPauseState.SECOND_HALF]: [] // Aucune transition depuis SECOND_HALF
      };

      if (validTransitions[currentState] && !validTransitions[currentState].includes(halfPauseState)) {
        throw new BadRequestException(`Transition invalide: ${currentState} -> ${halfPauseState}`);
      }

      match.halfPauseState = halfPauseState;

      // Si on passe en mi-temps, on peut émettre un événement
      if (halfPauseState === HalfPauseState.HALF_TIME) {
        this.matchGateway.server.emit('halfTime', {
          matchId: match.id,
          homeScore: match.scores?.home || 0,
          awayScore: match.scores?.away || 0,
          timestamp: new Date()
        });
      }

      const updatedMatch = await this.matchRepository.matchs.update(match);

      // Émission de l'événement de mise à jour
      this.matchGateway.server.emit('halfTimeStateUpdated', {
        matchId: match.id,
        halfPauseState: updatedMatch.halfPauseState,
        previousState: currentState,
        timestamp: new Date()
      });
      await this.checkRealTimeCoupons(match.id);

      return updatedMatch;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.updateHalfTimeState');
      throw error;
    }
  }


  /**
 * Met à jour les scores des tirs aux buts
 */
  async updatePenaltyScores(data: UpdateMatchPenaltyScoreDto): Promise<Match> {
    try {
      const { id, homePenalty, awayPenalty } = data;
      // Récupération du match avec toutes les relations nécessaires
      const match = await this.matchRepository.matchs.findOne({
        where: { id: id },
        relations: {
          home: true,
          away: true,
          events: true
        },
      });

      if (!match) {
        throw new NotFoundException('Match non trouvé');
      }

      // Validation des données
      if (homePenalty < 0 || awayPenalty < 0) {
        throw new BadRequestException('Les scores de tirs aux buts ne peuvent pas être négatifs');
      }

      // Vérifier que le match n'est pas déjà terminé
      if (match.etat === MatchState.TERMINER) {
        throw new BadRequestException('Le match est déjà terminé');
      }

      // Activer le flag de tirs aux buts
      match.isTirAuxButs = true;
      match.homePenalty = homePenalty;
      match.awayPenalty = awayPenalty;

      // Déterminer le vainqueur
      if (homePenalty > awayPenalty) {
        match.teamQualify = match.home.id;
      } else if (awayPenalty > homePenalty) {
        match.teamQualify = match.away.id;
      } else {
        throw new BadRequestException('Il doit forcement y avoir un vainqueur.');
      }

      // Sauvegarder les modifications
      const updatedMatch = await this.matchRepository.matchs.update(match);

      return updatedMatch;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.updatePenaltyScores');
      throw error;
    }
  }

  /**
   * Met à jour uniquement le statut isTirAuxButs
   * Utile pour indiquer que le match passe en tirs aux buts
   */
  async updateTirAuxButsStatus(data: UpdateMatchPenaltyStateDto): Promise<Match> {
    try {
      const { id } = data;
      const match = await this.matchRepository.matchs.findOne({
        where: { id: id },
        relations: { home: true, away: true }
      });

      if (!match) {
        throw new NotFoundException('Match non trouvé');
      }

      if (match.etat === MatchState.TERMINER) {
        throw new BadRequestException('Le match est déjà terminé');
      }

      match.isTirAuxButs = true;

      const updatedMatch = await this.matchRepository.matchs.update(match);

      return updatedMatch;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MatchService.updateTirAuxButsStatus');
      throw error;
    }
  }



  /**
 * Vérifie les coupons en temps réel (pendant le match)
 */
  private async checkRealTimeCoupons(matchId: string, scoreData?: UpdateMatchScoreEventDto): Promise<void> {
    const match = await this.matchRepository.matchs.findOne({
      where: { id: matchId },
      relations: { home: true, away: true, events: { joueur: true, equipe: true } }
    });

    if (!match) return;

    this.logger.log(`=== checkRealTimeCoupons appelé pour match ${matchId} ===`);
    this.logger.log(`État du match: ${match.etat}`);
    this.logger.log(`Score: ${match.scores.home}-${match.scores.away}`);
    this.logger.log(`Nombre d'événements chargés: ${match.events?.length || 0}`); // ✅ LOG

    const pendingCouponBets = await this.couponBetRepository.couponBets.find({
      where: {
        bet: { match: { id: matchId } },
        status: BetStatus.PENDING
      },
      relations: {
        bet: {
          match: { home: true, away: true }
        },
        coupon: { user: true }
      }
    });

    this.logger.log(`Nombre de couponBets en attente trouvés: ${pendingCouponBets.length}`);

    if (pendingCouponBets.length === 0) {
      this.logger.warn(`Aucun couponBet en attente pour le match ${matchId}`);
      return;
    }

    for (const couponBet of pendingCouponBets) {
      if (!couponBet.bet) {
        this.logger.error(`CouponBet ${couponBet.id} sans bet associé - ERREUR DE CHARGEMENT`);
        continue;
      }

      if (!couponBet.coupon) {
        this.logger.error(`CouponBet ${couponBet.id} sans coupon associé - ERREUR DE CHARGEMENT`);
        continue;
      }

      this.logger.log(`✅ Vérification du couponBet ${couponBet.id} - Catégorie: ${couponBet.bet.category}`);

      switch (couponBet.bet.category) {
        case CategoryName.MATCH_GOAL_SCORER:
          // ✅ CORRECTION: Toujours appeler, même sans scoreData
          await this.checkMatchGoalScorer(couponBet, scoreData, match);
          break;
        case CategoryName.BOTH_TEAMS_SCORE:
          await this.checkBothTeamsScore(couponBet, match);
          break;
        case CategoryName.MATCH_RESULT:
          await this.checkMatchResult(couponBet, match);
          break;
        case CategoryName.FIRST_HALF_RESULT:
          await this.checkFirstHalfResult(couponBet, match);
          break;
        case CategoryName.MATCH_TEAM_QUALIFY:
          await this.checkMatchTeamQualify(couponBet, match);
          break;
        default:
          this.logger.warn(`Catégorie non gérée: ${couponBet.bet.category}`);
      }

      if (couponBet.coupon) {
        await this.updateCouponStatus(couponBet.coupon.id);
      }
    }

    this.logger.log(`=== Fin checkRealTimeCoupons pour match ${matchId} ===`);
  }


  /**
 * Vérifie les paris de type MATCH_GOAL_SCORER
 */
  private async checkMatchGoalScorer(
    couponBet: CouponBet,
    scoreData: UpdateMatchScoreEventDto | undefined, // ✅ Peut être undefined
    match: Match
  ): Promise<void> {
    // ✅ Vérifier si déjà traité
    if (couponBet.status !== BetStatus.PENDING) {
      this.logger.log(`CouponBet ${couponBet.id} déjà traité (${couponBet.status}), skip`);
      return;
    }

    const selectedPlayerIds = Object.keys(couponBet.selectedOptions || {});

    if (selectedPlayerIds.length === 0) {
      this.logger.warn(`MATCH_GOAL_SCORER: Aucun joueur sélectionné pour couponBet ${couponBet.id}`);
      return;
    }

    const selectedPlayerId = selectedPlayerIds[0];

    this.logger.log(`--- checkMatchGoalScorer pour CouponBet ${couponBet.id} ---`);
    this.logger.log(`Joueur sélectionné: ${selectedPlayerId}`);
    this.logger.log(`État du match: ${match.etat}`);
    this.logger.log(`scoreData fourni: ${scoreData ? 'OUI' : 'NON'}`);

    // ✅ CAS 1: Vérification en temps réel (pendant le match)
    if (scoreData && scoreData.eventType === EventType.BUT && scoreData.playerId === selectedPlayerId) {
      this.logger.log(`🎯 Le joueur ${selectedPlayerId} vient de marquer!`);
      await this.markCouponBetAsWon(couponBet);
      return;
    }

    // ✅ CAS 2: Vérification à la fin du match
    if (match.etat === MatchState.TERMINER) {
      this.logger.log(`Match terminé - Vérification des événements...`);
      this.logger.log(`Nombre d'événements: ${match.events?.length || 0}`);

      // ✅ Afficher tous les événements pour déboguer
      if (match.events && match.events.length > 0) {
        match.events.forEach((event, index) => {
          this.logger.log(`Événement ${index + 1}: Type=${event.type}, Joueur=${event.joueur?.id || 'N/A'}, Minute=${event.minute}`);
        });
      } else {
        this.logger.warn(`Aucun événement trouvé dans le match!`);
      }

      // Vérifier si le joueur a marqué
      const playerScored = match.events?.some(event => {
        const hasScored = event.type === EventType.BUT && event.joueur?.id === selectedPlayerId;
        if (hasScored) {
          this.logger.log(`✅ Match trouvé: ${event.joueur?.id} a marqué à la ${event.minute}e minute`);
        }
        return hasScored;
      });

      if (playerScored) {
        this.logger.log(`🎉 Le joueur ${selectedPlayerId} a marqué - CouponBet GAGNANT`);
        await this.markCouponBetAsWon(couponBet);
      } else {
        this.logger.log(`❌ Le joueur ${selectedPlayerId} n'a pas marqué - CouponBet PERDANT`);
        await this.markCouponBetAsLost(couponBet);
      }
    } else {
      this.logger.log(`⏳ Match en cours (${match.etat}) - En attente...`);
    }
  }

  /**
   * Vérifie les paris de type BOTH_TEAMS_SCORE
   */
  private async checkBothTeamsScore(couponBet: CouponBet, match: Match): Promise<void> {
    // Pour BOTH_TEAMS_SCORE, selectedOptions contient { "YES": cote } ou { "NO": cote }
    const selectedOption = Object.keys(couponBet.selectedOptions || {})[0];

    if (!selectedOption) return;

    const bothTeamsScored = match.scores.home > 0 && match.scores.away > 0;

    if (selectedOption === "OUI" && bothTeamsScored) {
      await this.markCouponBetAsWon(couponBet);
    } else if (selectedOption === "NON" && !bothTeamsScored) {
      await this.markCouponBetAsWon(couponBet);
    }

    // Marquer comme perdu à la fin du match si la prédiction est fausse
    if (match.etat === MatchState.TERMINER) {
      if ((selectedOption === "OUI" && !bothTeamsScored) ||
        (selectedOption === "NON" && bothTeamsScored)) {
        await this.markCouponBetAsLost(couponBet);
      }
    }
  }

  /**
   * Vérifie les paris de type MATCH_RESULT
   */
  private async checkMatchResult(couponBet: CouponBet, match: Match): Promise<void> {
    const selectedResult = Object.keys(couponBet.selectedOptions || {})[0];

    this.logger.log(`--- checkMatchResult pour CouponBet ${couponBet.id} ---`);
    this.logger.log(`selectedOptions: ${JSON.stringify(couponBet.selectedOptions)}`);
    this.logger.log(`selectedResult: ${selectedResult}`);
    this.logger.log(`État match: ${match.etat}`);
    this.logger.log(`Score actuel: ${match.scores.home}-${match.scores.away}`);

    if (!selectedResult) {
      this.logger.warn(`Aucune option sélectionnée pour le couponBet ${couponBet.id}`);
      return;
    }

    if (match.etat === MatchState.TERMINER) {
      const actualResult = this.calculateMatchResult(match);

      this.logger.log(`✅ Match terminé - Résultat attendu: ${selectedResult}, Résultat réel: ${actualResult}`);

      if (selectedResult === actualResult) {
        this.logger.log(`🎉 CouponBet ${couponBet.id} GAGNANT`);
        await this.markCouponBetAsWon(couponBet);
      } else {
        this.logger.log(`❌ CouponBet ${couponBet.id} PERDANT`);
        await this.markCouponBetAsLost(couponBet);
      }
    } else {
      this.logger.log(`⏳ Match pas encore terminé, état actuel: ${match.etat}`);
    }
  }

  /**
   * Vérifie les paris de type FIRST_HALF_RESULT
   */
  private async checkFirstHalfResult(couponBet: CouponBet, match: Match): Promise<void> {
    // Vérifier seulement si on est à la mi-temps
    if (match.halfPauseState === HalfPauseState.HALF_TIME) {
      const selectedResult = Object.keys(couponBet.selectedOptions || {})[0];
      const firstHalfResult = this.calculateMatchResult(match);

      if (selectedResult === firstHalfResult) {
        await this.markCouponBetAsWon(couponBet);
      } else {
        await this.markCouponBetAsLost(couponBet);
      }
    }
  }

  /**
   * Vérifie les paris de type SECOND_HALF_RESULT
   */
  // private async checkSecondHalfResult(couponBet: CouponBet, match: Match): Promise<void> {
  //   // Vérifier seulement à la fin du match
  //   if (match.etat === MatchState.TERMINER) {
  //     const selectedResult = Object.keys(couponBet.selectedOptions || {})[0];
  //     const secondHalfResult = this.calculateSecondHalfResult(match);

  //     if (selectedResult === secondHalfResult) {
  //       await this.markCouponBetAsWon(couponBet);
  //     } else {
  //       await this.markCouponBetAsLost(couponBet);
  //     }
  //   }
  // }

  /**
   * Vérifie les paris de type MATCH_TEAM_QUALIFY
   */
  private async checkMatchTeamQualify(couponBet: CouponBet, match: Match): Promise<void> {
    // Pour MATCH_TEAM_QUALIFY, selectedOptions contient { "team-uuid": cote }
    const selectedTeamId = Object.keys(couponBet.selectedOptions || {})[0];

    if (!selectedTeamId) return;

    // Vérifier seulement à la fin du match
    if (match.etat === MatchState.TERMINER) {
      if (match.teamQualify === selectedTeamId) {
        await this.markCouponBetAsWon(couponBet);
      } else {
        await this.markCouponBetAsLost(couponBet);
      }
    }
  }

  /**
   * Calcule le résultat final du match
   */
  private calculateMatchResult(match: Match): 'V1' | 'X' | 'V2' {
    const homeScore = match.scores?.home || 0;
    const awayScore = match.scores?.away || 0;

    if (homeScore > awayScore) return 'V1';
    if (homeScore < awayScore) return 'V2';
    return 'X';
  }

  // Marquer le couponBet comme gagnant
  private async markCouponBetAsWon(couponBet: CouponBet): Promise<void> {
    try {
      // Vérifier que le couponBet n'est pas déjà traité
      if (couponBet.status === BetStatus.GAGNE || couponBet.status === BetStatus.PERDU) {
        this.logger.warn(`CouponBet ${couponBet.id} déjà traité avec le statut: ${couponBet.status}`);
        return;
      }

      // Mettre à jour le statut du couponBet
      couponBet.status = BetStatus.GAGNE;
      couponBet.updatedAt = new Date();

      // Récupérer la cote du pari
      const selectedOption = Object.keys(couponBet.selectedOptions || {})[0];
      const odds = couponBet.selectedOptions[selectedOption] || 1;

      await this.couponBetRepository.couponBets.update(
        CouponBetFactory.updateStatus(couponBet, BetStatus.GAGNE),
      );

      // Mettre à jour l'état du coupon parent
      if (couponBet.coupon?.id) {
        await this.updateCouponStatus(couponBet.coupon.id);
      }

      // Émettre un événement WebSocket
      this.matchGateway.server.emit('couponBetWon', {
        couponBetId: couponBet.id,
        couponId: couponBet.coupon?.id,
        betId: couponBet.bet?.id,
        matchId: couponBet.bet?.match?.id,
        selectedOption,
        odds,
        timestamp: new Date()
      });

    } catch (error) {
      this.logger.error(
        `Erreur lors du marquage du couponBet ${couponBet.id} comme gagnant: ${error.message}`,
        error.stack
      );
      throw error; // Ou gérer l'erreur selon votre stratégie
    }
  }

  /**
   * Marque un couponBet comme perdant
   */
  private async markCouponBetAsLost(couponBet: CouponBet): Promise<void> {
    try {
      // Vérifier que le couponBet n'est pas déjà traité
      if (couponBet.status === BetStatus.GAGNE || couponBet.status === BetStatus.PERDU) {
        this.logger.warn(`CouponBet ${couponBet.id} déjà traité avec le statut: ${couponBet.status}`);
        return;
      }

      // Mettre à jour le statut du couponBet
      couponBet.status = BetStatus.PERDU;
      couponBet.updatedAt = new Date();

      // Récupérer l'option choisie pour le logging
      const selectedOption = Object.keys(couponBet.selectedOptions || {})[0];

      // Log pour le débogage
      this.logger.log(`CouponBet ${couponBet.id} marqué comme perdant - Option: ${selectedOption}`);

      // Mettre à jour dans la base de données
      await this.couponBetRepository.couponBets.update(
        CouponBetFactory.updateStatus(couponBet, BetStatus.PERDU),
      );

      // Mettre à jour l'état du coupon parent
      if (couponBet.coupon?.id) {
        await this.updateCouponStatus(couponBet.coupon.id);
      }

      // Émettre un événement WebSocket
      this.matchGateway.server.emit('couponBetLost', {
        couponBetId: couponBet.id,
        couponId: couponBet.coupon?.id,
        betId: couponBet.bet?.id,
        matchId: couponBet.bet?.match?.id,
        selectedOption,
        timestamp: new Date()
      });

    } catch (error) {
      this.logger.error(
        `Erreur lors du marquage du couponBet ${couponBet.id} comme perdant: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  // VALIDER LES COUPONS
  /**
   * Vérifie et met à jour l'état d'un coupon en fonction de ses couponBets
  */
  // private async updateCouponStatus(couponId: string): Promise<void> {
  //   try {
  //     this.logger.log(`--- updateCouponStatus pour coupon ${couponId} ---`);

  //     const coupon = await this.couponRepository.coupons.findOne({
  //       where: { id: couponId },
  //       relations: {
  //         couponBets: { bet: { match: true } },
  //         user: true
  //       }
  //     });

  //     if (!coupon) {
  //       this.logger.warn(`Coupon ${couponId} non trouvé`);
  //       return;
  //     }

  //     this.logger.log(`État actuel du coupon: ${coupon.etat}`);

  //     if (coupon.etat !== CouponState.PENDING) {
  //       this.logger.log(`Coupon ${couponId} n'est pas en attente (${coupon.etat}), skip`);
  //       return;
  //     }

  //     const couponBets = coupon.couponBets || [];
  //     this.logger.log(`Nombre de couponBets: ${couponBets.length}`);

  //     const stats = {
  //       gagne: 0,
  //       perdu: 0,
  //       pending: 0
  //     };

  //     couponBets.forEach(couponBet => {
  //       this.logger.log(`CouponBet ${couponBet.id}: ${couponBet.status}`);
  //       switch (couponBet.status) {
  //         case BetStatus.GAGNE:
  //           stats.gagne++;
  //           break;
  //         case BetStatus.PERDU:
  //           stats.perdu++;
  //           break;
  //         case BetStatus.PENDING:
  //           stats.pending++;
  //           break;
  //       }
  //     });

  //     this.logger.log(`Stats - Gagnés: ${stats.gagne}, Perdus: ${stats.perdu}, En attente: ${stats.pending}`);

  //     let newCouponState: CouponState;
  //     let shouldPayout = false;

  //     if (stats.perdu > 0) {
  //       newCouponState = CouponState.LOOSE;
  //       shouldPayout = false;
  //       this.logger.log(`❌ Coupon PERDU (au moins un pari perdu)`);
  //     } else if (stats.pending > 0) {
  //       newCouponState = CouponState.PENDING;
  //       shouldPayout = false;
  //       this.logger.log(`⏳ Coupon reste EN ATTENTE`);
  //     } else if (stats.gagne === couponBets.length) {
  //       newCouponState = CouponState.WIN;
  //       shouldPayout = true;
  //       this.logger.log(`🎉 Coupon GAGNANT`);
  //     } else {
  //       newCouponState = CouponState.PENDING;
  //       shouldPayout = false;
  //     }

  //     if (coupon.etat !== newCouponState) {
  //       this.logger.log(`Mise à jour du coupon de ${coupon.etat} vers ${newCouponState}`);
  //       coupon.etat = newCouponState;
  //       await this.couponRepository.coupons.update(coupon);

  //       this.matchGateway.server.emit('couponStatusUpdated', {
  //         couponId: coupon.id,
  //         userId: coupon.user?.id,
  //         newState: newCouponState,
  //         gains: coupon.gains,
  //         timestamp: new Date()
  //       });

  //       if (shouldPayout && newCouponState === CouponState.WIN) {
  //         await this.payoutUser(coupon);
  //       }
  //     } else {
  //       this.logger.log(`Pas de changement d'état nécessaire`);
  //     }

  //   } catch (error) {
  //     this.logger.error(
  //       `Erreur lors de la mise à jour du statut du coupon ${couponId}: ${error.message}`,
  //       error.stack
  //     );
  //   }
  // }


  private async updateCouponStatus(couponId: string): Promise<void> {
    try {
      this.logger.log(`--- updateCouponStatus pour coupon ${couponId} ---`);

      const coupon = await this.couponRepository.coupons.findOne({
        where: { id: couponId },
        relations: {
          couponBets: { bet: { match: true } },
          user: true
        }
      });

      if (!coupon) {
        this.logger.warn(`Coupon ${couponId} non trouvé`);
        return;
      }

      this.logger.log(`État actuel du coupon: ${coupon.etat}, isPaid: ${coupon.isPaid}`);

      // ✅ CORRECTION: Ne pas skip si le coupon est déjà WIN mais non payé
      if (coupon.isPaid) {
        this.logger.log(`Coupon ${couponId} déjà payé, skip`);
        return;
      }

      const couponBets = coupon.couponBets || [];
      this.logger.log(`Nombre de couponBets: ${couponBets.length}`);

      const stats = {
        gagne: 0,
        perdu: 0,
        pending: 0
      };

      couponBets.forEach(couponBet => {
        this.logger.log(`CouponBet ${couponBet.id}: ${couponBet.status}`);
        switch (couponBet.status) {
          case BetStatus.GAGNE:
            stats.gagne++;
            break;
          case BetStatus.PERDU:
            stats.perdu++;
            break;
          case BetStatus.PENDING:
            stats.pending++;
            break;
        }
      });

      this.logger.log(`Stats - Gagnés: ${stats.gagne}, Perdus: ${stats.perdu}, En attente: ${stats.pending}`);

      let newCouponState: CouponState;
      let shouldPayout = false;

      if (stats.perdu > 0) {
        newCouponState = CouponState.LOOSE;
        shouldPayout = false;
        this.logger.log(`❌ Coupon PERDU (au moins un pari perdu)`);
      } else if (stats.pending > 0) {
        newCouponState = CouponState.PENDING;
        shouldPayout = false;
        this.logger.log(`⏳ Coupon reste EN ATTENTE`);
      } else if (stats.gagne === couponBets.length) {
        newCouponState = CouponState.WIN;
        shouldPayout = true;
        this.logger.log(`🎉 Coupon GAGNANT - Tous les paris sont gagnés`);
      } else {
        newCouponState = CouponState.PENDING;
        shouldPayout = false;
      }

      // ✅ CORRECTION: Mettre à jour même si l'état ne change pas (pour le paiement)
      if (coupon.etat !== newCouponState || shouldPayout) {
        if (coupon.etat !== newCouponState) {
          this.logger.log(`Mise à jour du coupon de ${coupon.etat} vers ${newCouponState}`);
          coupon.etat = newCouponState;
        }

        await this.couponRepository.coupons.update(coupon);

        this.matchGateway.server.emit('couponStatusUpdated', {
          couponId: coupon.id,
          userId: coupon.user?.id,
          newState: newCouponState,
          gains: coupon.gains,
          timestamp: new Date()
        });

        // ✅ CORRECTION: Paiement si le coupon est gagnant ET non payé
        if (newCouponState === CouponState.WIN && !coupon.isPaid) {
          this.logger.log(`💰 Tentative de paiement pour le coupon ${coupon.id}`);
          await this.payoutUser(coupon);
        }
      } else {
        this.logger.log(`Pas de changement d'état nécessaire`);
      }

    } catch (error) {
      this.logger.error(
        `Erreur lors de la mise à jour du statut du coupon ${couponId}: ${error.message}`,
        error.stack
      );
    }
  }


  // private async payoutUser(coupon: Coupon): Promise<void> {
  //   try {
  //     await this.dataSource.transaction(async (manager) => {
  //       // Recharger le coupon avec lock
  //       const lockedCoupon = await manager.findOne(CouponEntity, {
  //         where: { id: coupon.id },
  //         relations: { user: true },
  //         lock: { mode: 'pessimistic_write' },
  //       });

  //       if (!lockedCoupon) {
  //         throw new Error('Coupon introuvable');
  //       }

  //       if (!lockedCoupon.user) {
  //         throw new Error('Utilisateur non trouvé pour le coupon');
  //       }

  //       // Anti double paiement
  //       if (lockedCoupon.isPaid) {
  //         this.logger.warn(`Paiement déjà effectué pour le coupon ${lockedCoupon.id}`);
  //         return;
  //       }

  //       const gains = lockedCoupon.gains || 0;

  //       // Créditer le solde utilisateur
  //       lockedCoupon.user.solde += gains;
  //       lockedCoupon.isPaid = true;
  //       lockedCoupon.etat = CouponState.WIN;

  //       await manager.save(lockedCoupon.user);
  //       await manager.save(lockedCoupon);

  //       // Event websocket après succès du paiement
  //       this.matchGateway.server.emit('userPaid', {
  //         userId: lockedCoupon.user.id,
  //         couponId: lockedCoupon.id,
  //         amount: gains,
  //         timestamp: new Date(),
  //       });

  //       this.logger.log(
  //         `Paiement sécurisé de ${gains} à l'utilisateur ${lockedCoupon.user.id} pour le coupon ${lockedCoupon.id}`,
  //       );
  //     });
  //   } catch (error) {
  //     this.logger.error(
  //       `Erreur lors du paiement de l'utilisateur pour le coupon ${coupon.id}: ${error.message}`,
  //       error.stack,
  //     );
  //   }
  // }


  private async payoutUser(coupon: Coupon): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        // ✅ Récupérer le coupon avec sa relation user
        const lockedCoupon = await manager.findOne(CouponEntity, {
          where: { id: coupon.id },
          relations: { user: true }, // ← Charge la relation
          lock: { mode: 'pessimistic_write' },
        });

        if (!lockedCoupon) throw new Error('Coupon introuvable');
        if (lockedCoupon.isPaid) {
          this.logger.warn(`Coupon déjà payé`);
          return;
        }

        if (!lockedCoupon.user) {
          throw new Error('Utilisateur non trouvé');
        }

        // ✅ Verrouiller l'utilisateur
        const user = await manager.findOne(UserEntity, {
          where: { id: lockedCoupon.user.id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!user) throw new Error('Utilisateur non trouvé');

        const gains = lockedCoupon.gains || 0;
        user.solde += gains;
        lockedCoupon.isPaid = true;
        lockedCoupon.etat = CouponState.WIN;

        await manager.save(user);
        await manager.save(lockedCoupon);

        this.logger.log(`✅ Paiement de ${gains} FCFA`);
      });
    } catch (error) {
      this.logger.error(`❌ Erreur: ${error.message}`);
      throw error;
    }
  }

  /**
 * Vérifie tous les coupons liés à un match après une mise à jour
 */
  async checkMatchRelatedCoupons(matchId: string): Promise<void> {
    try {
      // Récupérer tous les couponBets pour ce match
      const couponBets = await this.couponBetRepository.couponBets.find({
        where: { bet: { match: { id: matchId } } },
        relations: { coupon: true, bet: { match: true } }
      });

      // Regrouper par coupon
      const couponMap = new Map<string, CouponBet[]>();

      couponBets.forEach(couponBet => {
        if (couponBet.coupon?.id) {
          const couponId = couponBet.coupon.id;
          if (!couponMap.has(couponId)) {
            couponMap.set(couponId, []);
          }
          couponMap.get(couponId)!.push(couponBet);
        }
      });

      // Mettre à jour chaque coupon
      for (const [couponId] of couponMap) {
        await this.updateCouponStatus(couponId);
      }

    } catch (error) {
      this.logger.error(
        `Erreur lors de la vérification des coupons pour le match ${matchId}: ${error.message}`,
        error.stack
      );
    }
  }
}
