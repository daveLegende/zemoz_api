import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration : Passage au système multi-tournoi via la table de jointure team_players.
 *
 * up()  : crée team_players, backfill depuis players, retire les colonnes obsolètes
 * down(): inverse la migration proprement
 */
export class TeamPlayerMigration1727088000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ------------------------------------------------------------------ //
    // 1. Créer la table team_players
    // ------------------------------------------------------------------ //
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team_players" (
        "id"            uuid              NOT NULL DEFAULT gen_random_uuid(),
        "player_id"     uuid              NOT NULL,
        "team_id"       uuid              NOT NULL,
        "numeroMaillot" integer,
        "poste"         character varying,
        "buts"          integer           NOT NULL DEFAULT 0,
        "passes"        integer           NOT NULL DEFAULT 0,
        "statut"        character varying          DEFAULT 'ACTIF',
        "createdAt"     TIMESTAMP                  NOT NULL DEFAULT now(),
        "updatedAt"     TIMESTAMP                  NOT NULL DEFAULT now(),
        "deletedAt"     TIMESTAMP,
        CONSTRAINT "PK_team_players" PRIMARY KEY ("id"),
        CONSTRAINT "FK_team_players_player" FOREIGN KEY ("player_id")
          REFERENCES "players"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_team_players_team"   FOREIGN KEY ("team_id")
          REFERENCES "teams"("id")   ON DELETE CASCADE,
        CONSTRAINT "UQ_team_players_player_team" UNIQUE ("player_id", "team_id")
      );
    `);

    // ------------------------------------------------------------------ //
    // 2. Backfill : migrer les lignes existantes dans players (team_id non null)
    //    On recopie buts/passes s'ils existent encore dans la table source
    // ------------------------------------------------------------------ //
    await queryRunner.query(`
      DO $$
      BEGIN
        -- Vérifier si les colonnes existent encore avant de les lire
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'team_id'
        ) THEN
          INSERT INTO "team_players" (
            "id", "player_id", "team_id",
            "buts", "passes", "statut",
            "createdAt", "updatedAt"
          )
          SELECT
            gen_random_uuid(),
            p.id,
            p.team_id,
            COALESCE(p.buts,   0),
            COALESCE(p.passes, 0),
            'ACTIF',
            NOW(),
            NOW()
          FROM "players" p
          WHERE p.team_id IS NOT NULL
          ON CONFLICT DO NOTHING;
        END IF;
      END $$;
    `);

    // ------------------------------------------------------------------ //
    // 3. Supprimer les colonnes obsolètes de players
    //    (team_id, buts, passes) — gérées dans team_players désormais
    // ------------------------------------------------------------------ //
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'team_id'
        ) THEN
          ALTER TABLE "players" DROP COLUMN "team_id";
        END IF;

        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'buts'
        ) THEN
          ALTER TABLE "players" DROP COLUMN "buts";
        END IF;

        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'passes'
        ) THEN
          ALTER TABLE "players" DROP COLUMN "passes";
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ------------------------------------------------------------------ //
    // 1. Ré-ajouter les colonnes à players
    // ------------------------------------------------------------------ //
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'team_id'
        ) THEN
          ALTER TABLE "players" ADD COLUMN "team_id" uuid;
          ALTER TABLE "players"
            ADD CONSTRAINT "FK_players_team"
              FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'buts'
        ) THEN
          ALTER TABLE "players" ADD COLUMN "buts" integer NOT NULL DEFAULT 0;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'players' AND column_name = 'passes'
        ) THEN
          ALTER TABLE "players" ADD COLUMN "passes" integer NOT NULL DEFAULT 0;
        END IF;
      END $$;
    `);

    // ------------------------------------------------------------------ //
    // 2. Backfill inverse : restaurer team_id/buts/passes depuis team_players
    //    (on prend la première inscription pour chaque joueur)
    // ------------------------------------------------------------------ //
    await queryRunner.query(`
      UPDATE "players" p
      SET
        team_id = tp.team_id,
        buts    = tp.buts,
        passes  = tp.passes
      FROM (
        SELECT DISTINCT ON (player_id)
          player_id, team_id, buts, passes
        FROM "team_players"
        WHERE "deletedAt" IS NULL
        ORDER BY player_id, "createdAt" ASC
      ) tp
      WHERE p.id = tp.player_id;
    `);

    // ------------------------------------------------------------------ //
    // 3. Supprimer la table team_players
    // ------------------------------------------------------------------ //
    await queryRunner.query(`DROP TABLE IF EXISTS "team_players";`);
  }
}
