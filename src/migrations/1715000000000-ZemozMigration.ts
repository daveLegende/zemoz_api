import { MigrationInterface, QueryRunner } from "typeorm";

export class ZemozMigration1715000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Créer l'organisation ZEMOZ
        await queryRunner.query(`
            INSERT INTO "organization" (id, name, slug, description, status, "createdAt", "updatedAt") 
            VALUES (gen_random_uuid(), 'ZEMOZ', 'zemoz', 'Organisation par défaut', 'ACTIVE', NOW(), NOW())
            ON CONFLICT DO NOTHING RETURNING id;
        `);

        // 2. Rattacher les administrateurs globaux existants (s'il y en a) à l'organisation ZEMOZ
        await queryRunner.query(`
            INSERT INTO "organization_member" (id, organization_id, admin_id, role, "isActive", "createdAt", "updatedAt")
            SELECT gen_random_uuid(), o.id, a.id, 'OWNER', true, NOW(), NOW()
            FROM "admins" a
            CROSS JOIN "organization" o
            WHERE o.slug = 'zemoz'
            ON CONFLICT DO NOTHING;
        `);

        // 3. Rattacher les tournois existants à l'organisation ZEMOZ
        await queryRunner.query(`
            UPDATE "tournois" 
            SET organization_id = (SELECT id FROM "organization" WHERE slug = 'zemoz'),
                status = 'ACTIVE',
                "ticketsEnabled" = true,
                "bettingEnabled" = true
            WHERE organization_id IS NULL;
        `);

        // 4. Backfill des entités : Lier toutes les équipes au premier tournoi (ou ZEMOZ) existant
        await queryRunner.query(`
            UPDATE "teams" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "poules" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "matchs" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "tickets" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "coupons" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);
        
        await queryRunner.query(`
            UPDATE "tournoi_coupons" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "infos" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "arbitres" 
            SET tournoi_id = (SELECT id FROM "tournois" ORDER BY "createdAt" ASC LIMIT 1)
            WHERE tournoi_id IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // En cas de rollback, on pourrait retirer les clés étrangères, mais ce n'est pas forcément pertinent
    }
}
