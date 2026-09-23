import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration : Assure la cohérence de tournoi_id sur la table matchs.
 *
 * Contexte (source de vérité — option b) :
 *   La colonne tournoi_id sur matchs est la source de vérité primaire pour
 *   associer un match à un tournoi. Avant cette migration, les matchs de type
 *   POULE pouvaient ne pas avoir tournoi_id rempli directement (le lien passait
 *   implicitement par match → poule → tournoi).
 *
 * Ce que fait cette migration :
 *   Pour tous les matchs qui n'ont pas de tournoi_id direct mais qui ont une
 *   poule rattachée à un tournoi, on backfille tournoi_id depuis poule.tournoi_id.
 *   Idempotent : ne fait rien si tournoi_id est déjà renseigné.
 */
export class EnsureMatchTournoiId1727200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        -- Backfill : copier poule.tournoi_id vers matchs.tournoi_id
        -- pour les matchs sans tournoi_id direct mais avec une poule liée à un tournoi.
        UPDATE "matchs" m
        SET "tournoi_id" = p."tournoi_id"
        FROM "poules" p
        WHERE m."poule" = p."id"
          AND m."tournoi_id" IS NULL
          AND p."tournoi_id" IS NOT NULL;

        RAISE NOTICE 'EnsureMatchTournoiId : backfill tournoi_id via poule terminé';
      END;
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Le down est intentionnellement no-op : on ne peut pas distinguer les
    // tournoi_id qui étaient déjà présents de ceux ajoutés par cette migration.
    // Pour annuler manuellement, réinitialiser tournoi_id = NULL sur les matchs
    // dont la seule source était la poule.
    await queryRunner.query(`SELECT 1; -- No-op: irreversible backfill`);
  }
}
