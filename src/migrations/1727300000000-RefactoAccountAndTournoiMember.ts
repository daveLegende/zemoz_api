import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration : Refonte de l'Identité (Accounts) et Multi-Tournoi (TournoiMember).
 *
 * 1. Création de la table `accounts` (fusion User / Admin).
 * 2. Création de la table `legacy_id_mapping` pour conserver la correspondance entre anciens IDs (user/admin) et nouveaux `account_id`.
 * 3. Création de la table `tournoi_member` pour la gestion des rôles fins par tournoi.
 * 4. Migration et Backfill des données des tables `admins` et `users` vers `accounts`.
 * 5. Migration des clés étrangères vers `account_id` sur les tables dépendantes :
 *    organization_member, transactions, coupons, tickets, pronostics, paris, mvp.
 */
export class RefactoAccountAndTournoiMember1727300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        -- 1. Création de la table accounts s'il elle n'existe pas
        CREATE TABLE IF NOT EXISTS "accounts" (
          "id" uuid NOT NULL DEFAULT gen_random_uuid(),
          "firstname" character varying NOT NULL DEFAULT '',
          "lastname" character varying NOT NULL DEFAULT '',
          "email" character varying,
          "phone" character varying,
          "solde" numeric NOT NULL DEFAULT '0',
          "sex" character varying,
          "country" character varying,
          "is_activated" boolean NOT NULL DEFAULT true,
          "password" character varying,
          "avatar" character varying,
          "platform_role" character varying NOT NULL DEFAULT 'USER',
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          "deleted_at" TIMESTAMP,
          CONSTRAINT "PK_accounts_id" PRIMARY KEY ("id")
        );

        -- 2. Création de la table legacy_id_mapping
        CREATE TABLE IF NOT EXISTS "legacy_id_mapping" (
          "legacy_id" uuid NOT NULL,
          "account_id" uuid NOT NULL,
          "source_table" character varying NOT NULL,
          CONSTRAINT "PK_legacy_id_mapping" PRIMARY KEY ("legacy_id")
        );

        -- 3. Création de la table tournoi_member
        CREATE TABLE IF NOT EXISTS "tournoi_member" (
          "id" uuid NOT NULL DEFAULT gen_random_uuid(),
          "tournoi_id" uuid NOT NULL,
          "account_id" uuid NOT NULL,
          "role" character varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_tournoi_member_id" PRIMARY KEY ("id"),
          CONSTRAINT "UQ_tournoi_member_account_role" UNIQUE ("tournoi_id", "account_id", "role")
        );

        -- FK tournoi_member
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_tournoi_member_tournoi'
        ) THEN
          ALTER TABLE "tournoi_member"
          ADD CONSTRAINT "FK_tournoi_member_tournoi"
          FOREIGN KEY ("tournoi_id") REFERENCES "tournois"("id") ON DELETE CASCADE;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'FK_tournoi_member_account'
        ) THEN
          ALTER TABLE "tournoi_member"
          ADD CONSTRAINT "FK_tournoi_member_account"
          FOREIGN KEY ("tournoi_id") REFERENCES "accounts"("id") ON DELETE CASCADE;
        END IF;

        -- 4. Backfill des admins vers accounts
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admins') THEN
          INSERT INTO "accounts" ("id", "firstname", "lastname", "email", "phone", "password", "platform_role", "created_at", "updated_at")
          SELECT 
            a."id", 
            COALESCE(a."firstname", ''), 
            COALESCE(a."lastname", ''), 
            a."email", 
            a."phone", 
            a."password", 
            CASE WHEN a."is_super_admin" IS TRUE THEN 'SUPER_ADMIN' ELSE 'USER' END,
            COALESCE(a."created_at", now()), 
            COALESCE(a."updated_at", now())
          FROM "admins" a
          ON CONFLICT ("id") DO NOTHING;

          INSERT INTO "legacy_id_mapping" ("legacy_id", "account_id", "source_table")
          SELECT a."id", a."id", 'admins'
          FROM "admins" a
          ON CONFLICT ("legacy_id") DO NOTHING;
        END IF;

        -- 5. Backfill des users vers accounts
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
          INSERT INTO "accounts" ("id", "firstname", "lastname", "email", "phone", "solde", "sex", "country", "is_activated", "password", "avatar", "platform_role", "created_at", "updated_at")
          SELECT 
            u."id", 
            COALESCE(u."firstname", ''), 
            COALESCE(u."lastname", ''), 
            u."email", 
            u."phone", 
            COALESCE(u."solde", 0), 
            u."sex", 
            u."country", 
            COALESCE(u."is_activated", true), 
            u."password", 
            u."avatar", 
            'USER',
            COALESCE(u."created_at", now()), 
            COALESCE(u."updated_at", now())
          FROM "users" u
          ON CONFLICT ("id") DO NOTHING;

          INSERT INTO "legacy_id_mapping" ("legacy_id", "account_id", "source_table")
          SELECT u."id", u."id", 'users'
          FROM "users" u
          ON CONFLICT ("legacy_id") DO NOTHING;
        END IF;

        -- 6. Mise à jour de organization_member : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'organization_member') THEN
          ALTER TABLE "organization_member" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "organization_member" om
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE om."admin_id" = m."legacy_id" AND om."account_id" IS NULL;
        END IF;

        -- 7. Mise à jour de transactions : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transactions') THEN
          ALTER TABLE "transactions" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "transactions" t
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE t."user_id" = m."legacy_id" AND t."account_id" IS NULL;
        END IF;

        -- 8. Mise à jour de coupons : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'coupons') THEN
          ALTER TABLE "coupons" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "coupons" c
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE c."user_id" = m."legacy_id" AND c."account_id" IS NULL;
        END IF;

        -- 9. Mise à jour de tickets : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tickets') THEN
          ALTER TABLE "tickets" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "tickets" tk
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE tk."user_id" = m."legacy_id" AND tk."account_id" IS NULL;
        END IF;

        -- 10. Mise à jour de pronostics : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pronostics') THEN
          ALTER TABLE "pronostics" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "pronostics" p
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE p."user_id" = m."legacy_id" AND p."account_id" IS NULL;
        END IF;

        -- 11. Mise à jour de paris : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'paris') THEN
          ALTER TABLE "paris" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "paris" pr
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE pr."user_id" = m."legacy_id" AND pr."account_id" IS NULL;
        END IF;

        -- 12. Mise à jour de mvps : ajout account_id
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'mvps') THEN
          ALTER TABLE "mvps" ADD COLUMN IF NOT EXISTS "account_id" uuid;
          UPDATE "mvps" mvp
          SET "account_id" = m."account_id"
          FROM "legacy_id_mapping" m
          WHERE mvp."user_id" = m."legacy_id" AND mvp."account_id" IS NULL;
        END IF;

        RAISE NOTICE 'Migration RefactoAccountAndTournoiMember1727300000000 exécutée avec succès';
      END;
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1; -- No-op: Data migration retains integrity`);
  }
}
