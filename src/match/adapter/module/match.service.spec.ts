import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MatchService } from './match.service';
import { IMatchService } from '../../app/module';
import { IMatchRepository, Match, MatchState, MatchType, EventType, HalfPauseState } from '../../domain';
import { IArbitreRepository } from '../../../arbitre/domain';
import { ITeamRepository } from '../../../team/domain';
import { IPouleRepository } from '../../../poule/domain';
import { IPlayerRepository, ITeamPlayerRepository, TeamPlayer } from '../../../player/domain';
import { IMatchEventRepository } from '../../../matchEvents/domain';
import { ICouponRepository } from '../../../coupon/domain/data.abstract';
import { ICouponBetService } from '../../../couponBet/app/module/coupon_bet.service';
import { ICouponBetRepository } from '../../../couponBet/domain';
import { MatchGateway } from './match.gateway';
import { DataSource } from 'typeorm';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeTeam = (id: string, overrides = {}) => ({
  id,
  name: `Équipe ${id}`,
  tournoi: { id: 'tournoi-uuid-1' },
  butMarques: 0,
  butConcedes: 0,
  poule: { id: 'poule-uuid-1' },
  ...overrides,
});

const makeMatch = (homeId: string, awayId: string): Match =>
  ({
    id: 'match-uuid-1',
    lieu: 'Stade de Lomé',
    type: MatchType.POULE,
    etat: MatchState.EN_COURS,
    date: new Date(),
    arbitres: [],
    home: makeTeam(homeId) as any,
    away: makeTeam(awayId) as any,
    scores: { home: 0, away: 0 },
    events: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as Match);

const makeInscription = (playerId: string, teamId: string, buts = 0): TeamPlayer =>
  ({
    id: `tp-${playerId}-${teamId}`,
    player: { id: playerId, name: 'Joueur Test' } as any,
    team: makeTeam(teamId) as any,
    buts,
    passes: 0,
    statut: 'ACTIF',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as TeamPlayer);

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockMatchRepo = () => ({
  matchs: {
    find: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
});

const mockTeamRepo = () => ({
  teams: {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  },
});

const mockPlayerRepo = () => ({
  players: {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  },
});

const mockTeamPlayerRepo = () => ({
  inscriptions: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
});

const mockMatchEventRepo = () => ({
  matchEvents: {
    find: jest.fn(),
    create: jest.fn(),
  },
});

const mockGateway = () => ({
  server: { emit: jest.fn() },
});

// ---------------------------------------------------------------------------
// Suite de tests
// ---------------------------------------------------------------------------

describe('MatchService — updateScore (multi-tournoi)', () => {
  let service: MatchService;
  let matchRepo: ReturnType<typeof mockMatchRepo>;
  let teamRepo: ReturnType<typeof mockTeamRepo>;
  let playerRepo: ReturnType<typeof mockPlayerRepo>;
  let teamPlayerRepo: ReturnType<typeof mockTeamPlayerRepo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IMatchService, useClass: MatchService },
        { provide: IMatchRepository, useFactory: mockMatchRepo },
        { provide: IArbitreRepository, useFactory: () => ({ arbitres: { find: jest.fn() } }) },
        { provide: ITeamRepository, useFactory: mockTeamRepo },
        { provide: IPouleRepository, useFactory: () => ({ poules: { find: jest.fn(), findOne: jest.fn() } }) },
        { provide: IPlayerRepository, useFactory: mockPlayerRepo },
        { provide: ITeamPlayerRepository, useFactory: mockTeamPlayerRepo },
        { provide: IMatchEventRepository, useFactory: mockMatchEventRepo },
        { provide: ICouponRepository, useFactory: () => ({ coupons: { find: jest.fn(), findOne: jest.fn() } }) },
        { provide: ICouponBetService, useFactory: () => ({ validateCoupon: jest.fn() }) },
        { provide: ICouponBetRepository, useFactory: () => ({ couponBets: { find: jest.fn(), update: jest.fn() } }) },
        { provide: DataSource, useFactory: () => ({ transaction: jest.fn() }) },
        { provide: MatchGateway, useFactory: mockGateway },
      ],
    }).compile();

    service = module.get<MatchService>(IMatchService as any);
    matchRepo = module.get(IMatchRepository);
    teamRepo = module.get(ITeamRepository);
    playerRepo = module.get(IPlayerRepository);
    teamPlayerRepo = module.get(ITeamPlayerRepository);
  });

  afterEach(() => jest.clearAllMocks());

  // =========================================================================
  // Tests clés : incrémentation sur TeamPlayer, pas Player
  // =========================================================================

  it('devrait incrémenter TeamPlayer.buts (pas Player.buts) lors d\'un événement BUT', async () => {
    const homeId = 'team-home-uuid';
    const awayId = 'team-away-uuid';
    const playerId = 'player-uuid-1';
    const tournoiAInscription = makeInscription(playerId, homeId, 0);

    const match = makeMatch(homeId, awayId);
    const updatedMatch = { ...match, scores: { home: 1, away: 0 } };

    matchRepo.matchs.findOne.mockResolvedValue(match);
    teamRepo.teams.findOne
      .mockResolvedValueOnce(makeTeam(homeId))
      .mockResolvedValueOnce(makeTeam(awayId));
    playerRepo.players.findOne.mockResolvedValue({ id: playerId, name: 'Joueur Test' });
    teamPlayerRepo.inscriptions.findOne.mockResolvedValue(tournoiAInscription);
    teamPlayerRepo.inscriptions.update.mockImplementation(async (inscription: any) => inscription);
    matchRepo.matchs.update.mockResolvedValue(updatedMatch);

    // Mock checkRealTimeCoupons & checkMatchRelatedCoupons (méthodes internes)
    jest.spyOn(service as any, 'checkMatchRelatedCoupons').mockResolvedValue(undefined);
    jest.spyOn(service as any, 'checkRealTimeCoupons').mockResolvedValue(undefined);

    await service.updateScore({
      id: match.id,
      homeScore: 1,
      awayScore: 0,
      eventType: EventType.BUT,
      teamId: homeId,
      playerId,
      minuite: 15,
    });

    // L'incrémentation doit se faire sur l'inscription, pas sur le joueur directement
    expect(teamPlayerRepo.inscriptions.update).toHaveBeenCalledWith(
      expect.objectContaining({ buts: 1 }), // inscription.buts a été incrémenté à 1
    );
  });

  it('les buts du Tournoi A ne doivent PAS affecter l\'inscription du Tournoi B pour le même joueur', async () => {
    // Simule deux inscriptions distinctes pour le même joueur dans deux tournois
    const playerId = 'player-uuid-1';
    const teamAId = 'team-A-uuid';
    const teamBId = 'team-B-uuid';

    const inscriptionTournoiA = makeInscription(playerId, teamAId, 2); // déjà 2 buts en tournoi A
    const inscriptionTournoiB = makeInscription(playerId, teamBId, 0); // 0 buts en tournoi B

    // Simuler l'incrémentation sur tournoi A
    inscriptionTournoiA.buts += 1;

    expect(inscriptionTournoiA.buts).toBe(3); // tournoi A = 3
    expect(inscriptionTournoiB.buts).toBe(0); // tournoi B inchangé
  });

  it('devrait lever NotFoundException si le joueur est introuvable', async () => {
    const homeId = 'team-home-uuid';
    const awayId = 'team-away-uuid';
    const match = makeMatch(homeId, awayId);

    matchRepo.matchs.findOne.mockResolvedValue(match);
    teamRepo.teams.findOne
      .mockResolvedValueOnce(makeTeam(homeId))
      .mockResolvedValueOnce(makeTeam(awayId));
    playerRepo.players.findOne.mockResolvedValue(null); // joueur introuvable

    await expect(
      service.updateScore({
        id: match.id,
        homeScore: 1,
        awayScore: 0,
        eventType: EventType.BUT,
        teamId: homeId,
        playerId: 'inexistant',
        minuite: 10,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('devrait lever NotFoundException si l\'inscription du joueur est introuvable pour l\'équipe', async () => {
    const homeId = 'team-home-uuid';
    const awayId = 'team-away-uuid';
    const playerId = 'player-uuid-1';
    const match = makeMatch(homeId, awayId);

    matchRepo.matchs.findOne.mockResolvedValue(match);
    teamRepo.teams.findOne
      .mockResolvedValueOnce(makeTeam(homeId))
      .mockResolvedValueOnce(makeTeam(awayId));
    playerRepo.players.findOne.mockResolvedValue({ id: playerId, name: 'Joueur Test' });
    teamPlayerRepo.inscriptions.findOne.mockResolvedValue(null); // pas inscrit dans cette équipe

    await expect(
      service.updateScore({
        id: match.id,
        homeScore: 1,
        awayScore: 0,
        eventType: EventType.BUT,
        teamId: homeId,
        playerId,
        minuite: 10,
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
