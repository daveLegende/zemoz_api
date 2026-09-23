import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PlayerService } from './player.service';
import { IPlayerService } from '../../app/module';
import { IPlayerRepository, ITeamPlayerRepository, Player, TeamPlayer } from '../../domain';
import { ITeamRepository } from '../../../team/domain';
import { DataSource } from 'typeorm';

// ---------------------------------------------------------------------------
// Helpers : builders de faux objets métier
// ---------------------------------------------------------------------------

const makePlayer = (overrides: Partial<Player> = {}): Player =>
  ({
    id: 'player-uuid-1',
    name: 'Kofi Mensah',
    age: 22,
    phone: '+22891234567',
    avatar: null,
    inscriptions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  } as Player);

const makeTeamPlayer = (overrides: Partial<TeamPlayer> = {}): TeamPlayer =>
  ({
    id: 'tp-uuid-1',
    player: makePlayer(),
    team: {
      id: 'team-uuid-1',
      name: 'FC Lomé',
      tournoi: { id: 'tournoi-uuid-1', name: 'Tournoi A' },
    } as any,
    numeroMaillot: 10,
    poste: 'ATTAQUANT',
    buts: 0,
    passes: 0,
    statut: 'ACTIF',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...overrides,
  } as TeamPlayer);

// ---------------------------------------------------------------------------
// Mock factories
// ---------------------------------------------------------------------------

const mockPlayerRepo = () => ({
  players: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
});

const mockTeamPlayerRepo = () => ({
  inscriptions: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
});

const mockTeamRepo = () => ({
  teams: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  },
});

const mockDataSource = () => ({
  transaction: jest.fn(),
});

// ---------------------------------------------------------------------------
// Suite de tests
// ---------------------------------------------------------------------------

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepo: ReturnType<typeof mockPlayerRepo>;
  let teamPlayerRepo: ReturnType<typeof mockTeamPlayerRepo>;
  let teamRepo: ReturnType<typeof mockTeamRepo>;
  let dataSource: ReturnType<typeof mockDataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IPlayerService, useClass: PlayerService },
        { provide: IPlayerRepository, useFactory: mockPlayerRepo },
        { provide: ITeamPlayerRepository, useFactory: mockTeamPlayerRepo },
        { provide: ITeamRepository, useFactory: mockTeamRepo },
        { provide: DataSource, useFactory: mockDataSource },
      ],
    }).compile();

    service = module.get<PlayerService>(IPlayerService as any);
    playerRepo = module.get(IPlayerRepository);
    teamPlayerRepo = module.get(ITeamPlayerRepository);
    teamRepo = module.get(ITeamRepository);
    dataSource = module.get(DataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // =========================================================================
  // fetchOne
  // =========================================================================
  describe('fetchOne', () => {
    it('devrait retourner le joueur s\'il existe', async () => {
      const player = makePlayer();
      playerRepo.players.findOne.mockResolvedValue(player);

      const result = await service.fetchOne(player.id);
      expect(result).toEqual(player);
      expect(playerRepo.players.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: player.id } }),
      );
    });

    it('devrait lever NotFoundException si le joueur n\'existe pas', async () => {
      playerRepo.players.findOne.mockResolvedValue(null);
      await expect(service.fetchOne('inexistant')).rejects.toThrow(NotFoundException);
    });
  });

  // =========================================================================
  // add — scénarios multi-tournoi
  // =========================================================================
  describe('add', () => {
    const fakeEquipe = {
      id: 'team-uuid-1',
      name: 'FC Lomé',
      tournoi: { id: 'tournoi-uuid-1' },
    };

    const inputData = {
      name: 'Kofi Mensah',
      phone: '+22891234567',
      team: 'team-uuid-1',
      age: 22,
    };

    beforeEach(() => {
      teamRepo.teams.findOne.mockResolvedValue(fakeEquipe);
    });

    it('devrait créer un nouveau joueur ET une inscription si le joueur n\'existe pas', async () => {
      playerRepo.players.findOne.mockResolvedValue(null);

      const createdPlayer = makePlayer({ id: 'new-player-uuid' });
      const createdPlayerWithInscriptions = {
        ...createdPlayer,
        inscriptions: [makeTeamPlayer()],
      };

      dataSource.transaction.mockImplementation(async (cb: any) =>
        cb({
          save: jest
            .fn()
            .mockResolvedValueOnce(createdPlayer)    // PlayerEntity save
            .mockResolvedValueOnce(makeTeamPlayer()), // TeamPlayerEntity save
          findOne: jest.fn().mockResolvedValue(createdPlayerWithInscriptions),
        }),
      );

      const result = await service.add(inputData as any);

      expect(dataSource.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
      expect(result.inscriptions).toBeDefined();
      expect(result.inscriptions.length).toBeGreaterThan(0);
    });

    it('devrait réutiliser un joueur existant (même nom + téléphone) et créer une inscription', async () => {
      const existingPlayer = makePlayer();
      playerRepo.players.findOne.mockResolvedValue(existingPlayer);
      teamPlayerRepo.inscriptions.findOne.mockResolvedValue(null); // pas encore inscrit

      const playerWithInscription = {
        ...existingPlayer,
        inscriptions: [makeTeamPlayer({ team: fakeEquipe as any })],
      };

      dataSource.transaction.mockImplementation(async (cb: any) =>
        cb({
          save: jest.fn().mockResolvedValue(makeTeamPlayer()),
          findOne: jest.fn().mockResolvedValue(playerWithInscription),
        }),
      );

      const result = await service.add(inputData as any);
      expect(result.id).toEqual(existingPlayer.id);
    });

    it('devrait lever ConflictException si le joueur est DÉJÀ inscrit dans cette équipe', async () => {
      const existingPlayer = makePlayer();
      playerRepo.players.findOne.mockResolvedValue(existingPlayer);
      // déjà inscrit dans la même équipe
      teamPlayerRepo.inscriptions.findOne.mockResolvedValue(makeTeamPlayer());

      await expect(service.add(inputData as any)).rejects.toThrow(ConflictException);
    });

    it('devrait lever NotFoundException si l\'équipe n\'existe pas', async () => {
      teamRepo.teams.findOne.mockResolvedValue(null);
      await expect(service.add(inputData as any)).rejects.toThrow(NotFoundException);
    });
  });

  // =========================================================================
  // Scénario multi-tournoi clé : même joueur dans 2 tournois différents
  // =========================================================================
  describe('Scénario multi-tournoi', () => {
    it('un même joueur peut être inscrit dans 2 tournois différents (2 TeamPlayer distincts)', async () => {
      const player = makePlayer();

      const inscriptionTournoiA = makeTeamPlayer({
        id: 'tp-tournoi-A',
        team: { id: 'team-A', tournoi: { id: 'tournoi-A' } } as any,
        buts: 3,
      });

      const inscriptionTournoiB = makeTeamPlayer({
        id: 'tp-tournoi-B',
        team: { id: 'team-B', tournoi: { id: 'tournoi-B' } } as any,
        buts: 1,
      });

      playerRepo.players.findOne.mockResolvedValue({
        ...player,
        inscriptions: [inscriptionTournoiA, inscriptionTournoiB],
      });

      const result = await service.fetchOne(player.id);
      expect(result.inscriptions).toHaveLength(2);

      // Les buts sont indépendants par tournoi
      const butsA = result.inscriptions.find((i) => i.id === 'tp-tournoi-A')?.buts;
      const butsB = result.inscriptions.find((i) => i.id === 'tp-tournoi-B')?.buts;
      expect(butsA).toBe(3);
      expect(butsB).toBe(1);
    });

    it('les buts incrémentés dans le Tournoi A n\'affectent PAS TeamPlayer.buts du Tournoi B', () => {
      // Test unitaire pur : vérifier l'isolation des stats
      const inscriptionA = makeTeamPlayer({ id: 'tp-A', buts: 0 });
      const inscriptionB = makeTeamPlayer({ id: 'tp-B', buts: 0 });

      // Simule l'incrémentation que MatchService fait sur inscription (pas sur Player)
      inscriptionA.buts += 1;

      expect(inscriptionA.buts).toBe(1);
      expect(inscriptionB.buts).toBe(0); // Tournoi B non affecté
    });

    it('un joueur NE PEUT PAS être inscrit 2 fois dans la MÊME équipe', async () => {
      const player = makePlayer();
      const equipe = { id: 'team-uuid-1', name: 'FC Lomé', tournoi: { id: 'tournoi-A' } };

      teamRepo.teams.findOne.mockResolvedValue(equipe);
      playerRepo.players.findOne.mockResolvedValue(player);
      // Inscription existante dans la même équipe
      teamPlayerRepo.inscriptions.findOne.mockResolvedValue(makeTeamPlayer());

      await expect(
        service.add({ name: player.name, phone: player.phone, team: equipe.id } as any),
      ).rejects.toThrow(ConflictException);
    });
  });

  // =========================================================================
  // remove / removeInscription
  // =========================================================================
  describe('remove', () => {
    it('devrait lever ConflictException si le joueur a encore des inscriptions actives', async () => {
      const player = makePlayer({ inscriptions: [makeTeamPlayer()] });
      playerRepo.players.findOne.mockResolvedValue(player);

      await expect(service.remove(player.id)).rejects.toThrow(ConflictException);
    });

    it('devrait retourner false si le joueur n\'existe pas', async () => {
      playerRepo.players.findOne.mockResolvedValue(null);
      const result = await service.remove('inexistant');
      expect(result).toBe(false);
    });
  });

  describe('removeInscription', () => {
    it('devrait supprimer une inscription sans supprimer le joueur', async () => {
      const inscription = makeTeamPlayer();
      teamPlayerRepo.inscriptions.findOne.mockResolvedValue(inscription);
      teamPlayerRepo.inscriptions.remove.mockResolvedValue(inscription);

      const result = await service.removeInscription(inscription.id);
      expect(result).toBe(true);
      // Le joueur n'est PAS supprimé
      expect(playerRepo.players.remove).not.toHaveBeenCalled();
    });

    it('devrait retourner false si l\'inscription est introuvable', async () => {
      teamPlayerRepo.inscriptions.findOne.mockResolvedValue(null);
      const result = await service.removeInscription('inexistant');
      expect(result).toBe(false);
    });
  });

  // =========================================================================
  // fetchByTournoi
  // =========================================================================
  describe('fetchByTournoi', () => {
    it('devrait retourner les inscriptions d\'un tournoi donné', async () => {
      const inscriptions = [makeTeamPlayer(), makeTeamPlayer({ id: 'tp-2' })];
      teamPlayerRepo.inscriptions.find.mockResolvedValue(inscriptions);

      const result = await service.fetchByTournoi('tournoi-uuid-1');
      expect(result).toHaveLength(2);
      expect(teamPlayerRepo.inscriptions.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { team: { tournoi: { id: 'tournoi-uuid-1' } } },
        }),
      );
    });
  });

  // =========================================================================
  // fetchPlayerHistory
  // =========================================================================
  describe('fetchPlayerHistory', () => {
    it('devrait retourner toutes les inscriptions d\'un joueur tous tournois confondus', async () => {
      const player = makePlayer();
      playerRepo.players.findOneBy.mockResolvedValue(player);

      const inscriptions = [
        makeTeamPlayer({ id: 'tp-hist-1', team: { id: 'team-A', tournoi: { id: 'tournoi-A' } } as any }),
        makeTeamPlayer({ id: 'tp-hist-2', team: { id: 'team-B', tournoi: { id: 'tournoi-B' } } as any }),
      ];
      teamPlayerRepo.inscriptions.find.mockResolvedValue(inscriptions);

      const result = await service.fetchPlayerHistory(player.id);
      expect(result).toHaveLength(2);
      // Les tournois doivent être différents
      const tournoiIds = result.map((i) => (i.team as any).tournoi.id);
      expect(new Set(tournoiIds).size).toBe(2);
    });

    it('devrait lever NotFoundException si le joueur n\'existe pas', async () => {
      playerRepo.players.findOneBy.mockResolvedValue(null);
      await expect(service.fetchPlayerHistory('inexistant')).rejects.toThrow(NotFoundException);
    });
  });
});
