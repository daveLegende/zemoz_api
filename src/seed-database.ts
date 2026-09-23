import * as dotenv from 'dotenv';
dotenv.config({ path: '.test.env' });
import { DataSource } from 'typeorm';
import { join } from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'petitpotopro',
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
});
import { OrganizationEntity } from './organization/framework/database/schema/organization.entity';
import { OrganizationMemberEntity, OrganizationRole } from './organization/framework/database/schema/organization_member.entity';
import { AdminEntity } from './admin/framework/database/schema/admin.entity';
import { TournoiEntity } from './tournoi/framework/database/schema/tournoi.entity';
import { TeamEntity } from './team/framework/database/schema/team.entity';
import { PouleEntity } from './poule/framework/database/schema/poule.entity';
import { PlayerEntity } from './player/framework/database/schema/player.entity';
import { TeamPlayerEntity } from './player/framework/database/schema/team-player.entity';
import { ArbitreEntity } from './arbitre/framework/database/schema/arbitre.entity';
import { MatchEntity } from './match/framework/database/schema/match.entity';
import { MatchEventEntity } from './matchEvents/framework/database/schema/match.event.entity';
import { UserEntity } from './user/framework/database/schema/user.entity';
import { TicketEntity } from './ticket/framework/database/schema/ticket.entity';
import { BetEntity } from './bet/framework/schema/bet.entity';
import { CouponEntity } from './coupon/framework/schema/coupon.entity';
import { CouponBetEntity } from './couponBet/framework/schema/coupon_bet.entity';
import { InfoEntity } from './infos/framework/database/schema/info.entity';
import { EventType, MatchState, MatchType } from './match/domain/match.enum';
import { RoleArbitre } from './arbitre/domain/arbitre.enum';
import { TicketDuration, TicketPosition, TicketState, TicketType } from './ticket/domain/ticket.enum';
import { CategoryName } from './bet/domain/bet.enum';
import { BetStatus } from './couponBet/domain/coupon.bet.enum';
import { CouponState } from './coupon/domain/coupon.enum';
import * as fs from 'fs';
import * as path from 'path';

const FIRST_NAMES = [
  'Koffi', 'Kodjo', 'Komla', 'Kossi', 'Yao', 'Afi', 'Ama', 'Akossiwa', 'Adjo', 'Abra',
  'Emmanuel', 'Folly', 'Delali', 'Elom', 'Senam', 'Edem', 'Kewin', 'Gilbert', 'Serge', 'Pascal',
  'Gilles', 'Ihlas', 'Floyd', 'Djene', 'Alaixys', 'Dove', 'Matthieu', 'Steve', 'Kevin', 'Laba'
];

const LAST_NAMES = [
  'Mensah', 'Lawson', 'Afanou', 'Amouzou', 'Doe', 'Agbedzi', 'Kpogholou', 'Adebayor', 'Dakonam', 'Kodjo',
  'Ayite', 'Romao', 'Wome', 'Dossevi', 'Bebou', 'Sunu', 'Gnassingbe', 'Assou-Ekotto', 'Song', 'Eto’o'
];

const TEAM_NAMES_BASE = [
  'AS Togo-Port', 'Etoile Filante', 'Dynamic Togolais', 'Semassi FC', 'ASKO de Kara',
  'Gomido FC', 'Koroki Metete', 'Entente II', 'Sara Sport', 'Kakadl FC',
  'Tambo FC', 'Espoir de Tsévié', 'Anges de Notsé', 'Doumbé FC', 'Unisport FC', 'Arabia FC'
];

async function seed() {
  console.log('🌱 Initialisation de la base de données avec des données mock réalistes...');
  await AppDataSource.initialize();

  // 1. Nettoyage des anciennes données
  console.log('🧹 Nettoyage des tables existantes...');
  const queryRunner = AppDataSource.createQueryRunner();
  // Truncate only if tables exist (synchronize may have just created them)
  await queryRunner.query(`
    DO $$ BEGIN
      EXECUTE (
        SELECT COALESCE(
          'TRUNCATE TABLE ' || string_agg(quote_ident(tablename), ', ') || ' CASCADE',
          'SELECT 1'
        )
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename IN ('coupon_bets','coupons','bets','tickets','match_events','matchs','players','poules','teams','arbitres','infos','organization_member','tournois','organization','users','admins')
      );
    END $$;
  `);

  // Repositories
  const orgRepo = AppDataSource.getRepository(OrganizationEntity);
  const orgMemberRepo = AppDataSource.getRepository(OrganizationMemberEntity);
  const adminRepo = AppDataSource.getRepository(AdminEntity);
  const tournoiRepo = AppDataSource.getRepository(TournoiEntity);
  const teamRepo = AppDataSource.getRepository(TeamEntity);
  const pouleRepo = AppDataSource.getRepository(PouleEntity);
  const playerRepo = AppDataSource.getRepository(PlayerEntity);
  const teamPlayerRepo = AppDataSource.getRepository(TeamPlayerEntity);
  const arbitreRepo = AppDataSource.getRepository(ArbitreEntity);
  const matchRepo = AppDataSource.getRepository(MatchEntity);
  const eventRepo = AppDataSource.getRepository(MatchEventEntity);
  const userRepo = AppDataSource.getRepository(UserEntity);
  const ticketRepo = AppDataSource.getRepository(TicketEntity);
  const betRepo = AppDataSource.getRepository(BetEntity);
  const couponRepo = AppDataSource.getRepository(CouponEntity);
  const couponBetRepo = AppDataSource.getRepository(CouponBetEntity);
  const infoRepo = AppDataSource.getRepository(InfoEntity);

  // 2. Création des Administrateurs Globaux & Super Admin
  console.log('👤 Création des Administrateurs...');
  const superAdmin = adminRepo.create({
    nom: 'Super Admin ZEMOZ',
    email: 'superadmin@zemoz.com',
    password: '$2a$10$e8wFp1i3Z2F1RzN8U4lW7uW5Z6Y7X8W9V0U1T2S3R4Q5P6O7N8M9L',
    isSuperAdmin: true,
  });

  const orgAdmin1 = adminRepo.create({
    nom: 'Kodjo Administrator',
    email: 'admin.lome@zemoz.com',
    password: '$2a$10$e8wFp1i3Z2F1RzN8U4lW7uW5Z6Y7X8W9V0U1T2S3R4Q5P6O7N8M9L',
    isSuperAdmin: false,
  });

  const orgAdmin2 = adminRepo.create({
    nom: 'Afi Manager',
    email: 'manager.wacc@zemoz.com',
    password: '$2a$10$e8wFp1i3Z2F1RzN8U4lW7uW5Z6Y7X8W9V0U1T2S3R4Q5P6O7N8M9L',
    isSuperAdmin: false,
  });

  await adminRepo.save([superAdmin, orgAdmin1, orgAdmin2]);

  // 3. Création des 3 Organisations
  console.log('🏢 Création des 3 Organisations...');
  const orgsData = [
    { name: 'ZEMOZ Sports League', slug: 'zemoz-sports', description: 'Ligue officielle ZEMOZ Afrique de l\'Ouest', logo: 'https://res.cloudinary.com/dasekay8s/image/upload/v1/zemoz_logo.png', status: 'ACTIVE' },
    { name: 'Lomé Football Association', slug: 'lome-fa', description: 'Fédération Régionale du Grand Lomé', logo: 'https://res.cloudinary.com/dasekay8s/image/upload/v1/lome_logo.png', status: 'ACTIVE' },
    { name: 'West Africa Champions Cup', slug: 'wacc-org', description: 'Organisation des tournois régionaux inter-villes', logo: 'https://res.cloudinary.com/dasekay8s/image/upload/v1/wacc_logo.png', status: 'ACTIVE' },
  ];

  const savedOrgs = await orgRepo.save(orgRepo.create(orgsData));

  // Attribution des Membres aux Organisations
  await orgMemberRepo.save([
    orgMemberRepo.create({ organization: savedOrgs[0], account: superAdmin as any, role: OrganizationRole.OWNER, isActive: true }),
    orgMemberRepo.create({ organization: savedOrgs[1], account: orgAdmin1 as any, role: OrganizationRole.ADMIN, isActive: true }),
    orgMemberRepo.create({ organization: savedOrgs[2], account: orgAdmin2 as any, role: OrganizationRole.MANAGER, isActive: true }),
  ]);

  // 4. Création des Tournois (3 Tournois par Organisation, chacun avec des Éditions)
  console.log('🏆 Création des Tournois et des Éditions...');
  const tournoisToSave: Partial<TournoiEntity>[] = [];

  const tournoiConfigs = [
    { orgIdx: 0, title: 'ZEMOZ Trophy', slug: 'zemoz-trophy', editions: ['Édition 2024', 'Édition 2025', 'Édition 2026'] },
    { orgIdx: 0, title: 'ZEMOZ Junior Cup', slug: 'zemoz-junior', editions: ['Saison 1', 'Saison 2', 'Saison 3'] },
    { orgIdx: 0, title: 'ZEMOZ Corporate League', slug: 'zemoz-corp', editions: ['Édition Printemps', 'Édition Été', 'Édition Hiver'] },

    { orgIdx: 1, title: 'Coupe Inter-Quartiers Lomé', slug: 'coupe-lome', editions: ['Édition 2024', 'Édition 2025', 'Édition 2026'] },
    { orgIdx: 1, title: 'Lomé Champions Trophy', slug: 'lome-champions', editions: ['Édition 1', 'Édition 2', 'Édition 3'] },
    { orgIdx: 1, title: 'Coupe de la Jeunesse', slug: 'coupe-jeunesse', editions: ['Phase 1', 'Phase 2', 'Phase 3'] },

    { orgIdx: 2, title: 'West Africa Challenge', slug: 'wacc-challenge', editions: ['Édition 2024', 'Édition 2025', 'Édition 2026'] },
    { orgIdx: 2, title: 'Super Coupe Régionale', slug: 'super-coupe', editions: ['Édition Alpha', 'Édition Beta', 'Édition Gamma'] },
    { orgIdx: 2, title: 'Cup of Champions', slug: 'cup-of-champions', editions: ['Saison A', 'Saison B', 'Saison C'] },
  ];

  for (const cfg of tournoiConfigs) {
    for (let i = 0; i < cfg.editions.length; i++) {
      tournoisToSave.push({
        name: `${cfg.title} - ${cfg.editions[i]}`,
        editionName: cfg.editions[i],
        edition: i + 1,
        slug: `${cfg.slug}-ed${i + 1}`,
        status: 'ACTIVE',
        ticketsEnabled: true,
        bettingEnabled: true,
        organization: savedOrgs[cfg.orgIdx],
      });
    }
  }

  const savedTournois = await tournoiRepo.save(tournoiRepo.create(tournoisToSave));
  console.log(`✅ ${savedTournois.length} Tournois/Éditions créés.`);

  // 5. Création d'au moins 100 Utilisateurs réels
  console.log('👥 Création de 105 Utilisateurs réels...');
  const usersToSave: Partial<UserEntity>[] = [];
  for (let i = 1; i <= 105; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    usersToSave.push({
      firstname: fn,
      lastname: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@gmail.com`,
      phone: `+22890${String(100000 + i).padStart(6, '0')}`,
      password: '$2a$10$e8wFp1i3Z2F1RzN8U4lW7uW5Z6Y7X8W9V0U1T2S3R4Q5P6O7N8M9L',
      solde: Math.floor(Math.random() * 50000) + 2000,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${ln}`,
    });
  }
  const savedUsers = await userRepo.save(userRepo.create(usersToSave));

  // 6. Création des Arbitres
  console.log('🚩 Création des Arbitres...');
  const arbitreNames = [
    'Eric Otogo-Castane', 'Janny Sikazwe', 'Bakary Gassama', 'Victor Gomes',
    'Mustapha Ghorbal', 'Maguette Ndiaye', 'Bamlak Tessema', 'Jean-Jacques Ndala'
  ];
  const arbitresToSave = arbitreNames.map((name, idx) => ({
    name,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
    phone: `+22892${String(200000 + idx).padStart(6, '0')}`,
    role: idx % 2 === 0 ? RoleArbitre.PRINCIPAL : RoleArbitre.TOUCHE,
    tournoi: savedTournois[idx % savedTournois.length],
  }));
  const savedArbitres = await arbitreRepo.save(arbitreRepo.create(arbitresToSave));

  // 7. Remplissage des Équipes, Poules, Joueurs et Matchs pour le premier Tournoi principal
  const targetTournoi = savedTournois[0];
  console.log(`⚽ Remplissage du tournoi principal : ${targetTournoi.name}...`);

  // Équipes
  const teamsData = TEAM_NAMES_BASE.slice(0, 8).map((name) => ({
    name,
    logo: `https://res.cloudinary.com/dasekay8s/image/upload/v1/teams/${name.toLowerCase().replace(/\s+/g, '_')}.png`,
    points: 0,
    matchJoues: 0,
    butMarques: 0,
    butConcedes: 0,
    tournoi: targetTournoi,
  }));
  const savedTeams = await teamRepo.save(teamRepo.create(teamsData));

  // Poules (Poule A & Poule B)
  const pouleA = await pouleRepo.save(pouleRepo.create({ name: 'Poule A', tournoi: targetTournoi, equipes: savedTeams.slice(0, 4) }));
  const pouleB = await pouleRepo.save(pouleRepo.create({ name: 'Poule B', tournoi: targetTournoi, equipes: savedTeams.slice(4, 8) }));

  // Mettre à jour les poules des équipes
  for (let i = 0; i < 4; i++) {
    savedTeams[i].poule = pouleA;
    savedTeams[i + 4].poule = pouleB;
  }
  await teamRepo.save(savedTeams);

  // Joueurs
  console.log('🏃‍♂️ Création des Joueurs pour les équipes...');
  const savedPlayers: PlayerEntity[] = [];
  for (const team of savedTeams) {
    for (let j = 1; j <= 6; j++) {
      const fn = FIRST_NAMES[(j * 7) % FIRST_NAMES.length];
      const ln = LAST_NAMES[(j * 11) % LAST_NAMES.length];
      const player = await playerRepo.save(
        playerRepo.create({
          name: `${fn} ${ln}`,
          age: 18 + (j % 12),
          phone: `+22891${String(300000 + j).padStart(6, '0')}`,
          avatar: `https://api.dicebear.com/7.x/person/svg?seed=${fn}${ln}`,
        }),
      );
      savedPlayers.push(player);
      await teamPlayerRepo.save(
        teamPlayerRepo.create({
          player,
          team,
          numeroMaillot: j,
          poste: j === 1 ? 'GARDIEN' : j <= 3 ? 'DEFENSEUR' : j <= 5 ? 'MILIEU' : 'ATTAQUANT',
          buts: Math.floor(Math.random() * 5),
          passes: Math.floor(Math.random() * 3),
          statut: 'ACTIF',
        }),
      );
    }
  }


  // Matchs de Poule (Phase de Poule)
  console.log('🏟️ Création des Matchs et Événements...');
  const match1 = await matchRepo.save(matchRepo.create({
    lieu: 'Stade de Kégué, Lomé',
    type: MatchType.POULE,
    etat: MatchState.TERMINER,
    journee: 1,
    date: new Date('2026-09-20T15:00:00Z'),
    home: savedTeams[0],
    away: savedTeams[1],
    poule: pouleA,
    tournoi: targetTournoi,
    scores: { home: 2, away: 1 },
    arbitres: [savedArbitres[0]],
  }));

  const match2 = await matchRepo.save(matchRepo.create({
    lieu: 'Stade d\'Agbalépédogan',
    type: MatchType.POULE,
    etat: MatchState.TERMINER,
    journee: 1,
    date: new Date('2026-09-21T17:00:00Z'),
    home: savedTeams[2],
    away: savedTeams[3],
    poule: pouleA,
    tournoi: targetTournoi,
    scores: { home: 0, away: 0 },
    arbitres: [savedArbitres[1]],
  }));

  // Matchs de Phase Finale (Quart et Demi)
  const matchDemi = await matchRepo.save(matchRepo.create({
    lieu: 'Stade de Kégué, Lomé',
    type: MatchType.DEMI,
    etat: MatchState.EN_COURS,
    journee: 2,
    date: new Date('2026-09-23T16:00:00Z'),
    home: savedTeams[0],
    away: savedTeams[4],
    tournoi: targetTournoi,
    scores: { home: 1, away: 1 },
    arbitres: [savedArbitres[0], savedArbitres[1]],
  }));

  // Événements de match (Buts & Cartons)
  await eventRepo.save([
    eventRepo.create({ match: match1, equipe: savedTeams[0], joueur: savedPlayers[0], type: EventType.BUT, minute: 23 }),
    eventRepo.create({ match: match1, equipe: savedTeams[0], joueur: savedPlayers[1], type: EventType.BUT, minute: 67 }),
    eventRepo.create({ match: match1, equipe: savedTeams[1], joueur: savedPlayers[7], type: EventType.BUT, minute: 85 }),
    eventRepo.create({ match: match1, equipe: savedTeams[1], joueur: savedPlayers[8], type: EventType.CARTON_JAUNE, minute: 42 }),
  ]);

  // 8. Création des Paris (Bets), Tickets, Coupons
  console.log('🎟️ Création des Tickets, Paris et Coupons...');

  // Tickets
  const ticketsToSave = savedUsers.slice(0, 10).map((user, idx) => ({
    type: idx % 2 === 0 ? TicketType.VIP : TicketType.STANDARD,
    duree: idx % 3 === 0 ? TicketDuration.TOURNOI_COMPLET : TicketDuration.SIMPLE,
    amount: idx % 2 === 0 ? 5000 : 2000,
    date: new Date(),
    etat: TicketState.VALIDE,
    position: TicketPosition.ENTREE,
    code: `TKT20260922${idx}`,
    qrCode: `data:image/png;base64,mockqrcode${idx}`,
    user: user,
    tournoi: targetTournoi,
    matchs: [match1],
  }));
  await ticketRepo.save(ticketRepo.create(ticketsToSave));

  // Bets
  const bet1 = await betRepo.save(betRepo.create({
    category: CategoryName.MATCH_RESULT,
    odds: { V1: 1.85, X: 3.20, V2: 4.10 },
    match: matchDemi,
    competition: targetTournoi,
  }));

  const bet2 = await betRepo.save(betRepo.create({
    category: CategoryName.BOTH_TEAMS_SCORE,
    odds: { OUI: 1.75, NON: 2.10 },
    match: matchDemi,
    competition: targetTournoi,
  }));

  // Coupons
  const coupon1 = await couponRepo.save(couponRepo.create({
    account: savedUsers[0] as any,
    amount: 2000,
    totalOdds: 3.23,
    gains: 6460,
    etat: CouponState.PENDING,
    isPaid: false,
    tournoi: targetTournoi,
  }));

  await couponBetRepo.save([
    couponBetRepo.create({ coupon: coupon1 as any, bet: bet1, selectedOptions: { V1: 1.85 }, status: BetStatus.PENDING }),
    couponBetRepo.create({ coupon: coupon1 as any, bet: bet2, selectedOptions: { OUI: 1.75 }, status: BetStatus.PENDING }),
  ]);

  // Infos / Actualités
  console.log('📰 Création des Actualités / Infos...');
  await infoRepo.save([
    infoRepo.create({
      title: 'Lancement officiel du ZEMOZ Trophy 2024 !',
      desc: 'Le tournoi tant attendu réunit les 8 meilleures équipes de la région pour une compétition épique.',
      image: 'https://res.cloudinary.com/dasekay8s/image/upload/v1/news1.png',
      tournoi: targetTournoi,
    }),
    infoRepo.create({
      title: 'Demi-finales sous haute tension ce week-end',
      desc: 'AS Togo-Port affronte ASKO de Kara dans un duel au sommet au Stade de Kégué.',
      image: 'https://res.cloudinary.com/dasekay8s/image/upload/v1/news2.png',
      tournoi: targetTournoi,
    }),
  ]);

  console.log('✨ Seed complété avec succès ! Expropriation des données en JSON...');

  // 9. Exportation globale des données réelles au format JSON
  const exportData = {
    organizationsCount: savedOrgs.length,
    tournamentsCount: savedTournois.length,
    usersCount: savedUsers.length,
    organizations: savedOrgs.map(o => ({ id: o.id, name: o.name, slug: o.slug })),
    tournamentsSample: savedTournois.slice(0, 9).map(t => ({ id: t.id, name: t.name, slug: t.slug, org: t.organization?.name })),
    usersSample: savedUsers.slice(0, 10).map(u => ({ id: u.id, name: `${u.firstname} ${u.lastname}`, email: u.email, solde: u.solde })),
    teamsSample: savedTeams.map(tm => ({ id: tm.id, name: tm.name, poule: tm.poule?.name })),
    matchesSample: [match1, match2, matchDemi].map(m => ({ id: m.id, type: m.type, teams: `${m.home.name} vs ${m.away.name}`, score: m.scores })),
  };

  const outputPath = path.join(__dirname, 'mock_dataset.json');
  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));
  console.log(`🎉 Fichier JSON de rapport créé avec succès à : ${outputPath}`);

  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('❌ Erreur lors du seed :', err);
  process.exit(1);
});
