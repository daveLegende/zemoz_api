import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration : Mise à jour de la table mvp_votes pour le multi-tournoi.
 * Ajoute match_id et team_player_id, et supprime la colonne globale player_id.
 */
export class FixMVPMultiTournoi1727100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        -- 1. Ajouter match_id si elle n'existe pas
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'match_id'
        ) THEN
          ALTER TABLE "mvp_votes" ADD COLUMN "match_id" uuid;
          ALTER TABLE "mvp_votes"
            ADD CONSTRAINT "FK_mvp_votes_match"
              FOREIGN KEY ("match_id") REFERENCES "matchs"("id") ON DELETE CASCADE;
        END IF;

        -- 2. Ajouter team_player_id si elle n'existe pas
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'team_player_id'
        ) THEN
          ALTER TABLE "mvp_votes" ADD COLUMN "team_player_id" uuid;
          ALTER TABLE "mvp_votes"
            ADD CONSTRAINT "FK_mvp_votes_team_player"
              FOREIGN KEY ("team_player_id") REFERENCES "team_players"("id") ON DELETE CASCADE;
        END IF;

        -- 3. Si player_id existe et team_player_id est vide, tenter un backfill
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'player_id'
        ) THEN
          UPDATE "mvp_votes" mvp
          SET "team_player_id" = tp.id
          FROM "team_players" tp
          WHERE mvp.player_id = tp.player_id
            AND mvp.team_player_id IS NULL;

          ALTER TABLE "mvp_votes" DROP COLUMN "player_id";
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'player_id'
        ) THEN
          ALTER TABLE "mvp_votes" ADD COLUMN "player_id" uuid;
          ALTER TABLE "mvp_votes"
            ADD CONSTRAINT "FK_mvp_votes_player"
              FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE;

          UPDATE "mvp_votes" mvp
          SET "player_id" = tp.player_id
          FROM "team_players" tp
          WHERE mvp.team_player_id = tp.id;
        END IF;

        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'team_player_id'
        ) THEN
          ALTER TABLE "mvp_votes" DROP COLUMN "team_player_id";
        END IF;

        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'mvp_votes' AND column_name = 'match_id'
        ) THEN
          ALTER TABLE "mvp_votes" DROP COLUMN "match_id";
        END IF;
      END $$;
    `);
  }
}
