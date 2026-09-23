import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Tournoi } from '../../../../tournoi/domain';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';
import { BetEntity } from '../../../../bet/framework/schema/bet.entity';
import { OrganizationEntity } from '../../../../organization/framework/database/schema/organization.entity';

@Entity('tournois')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class TournoiEntity extends ATimestamp implements Tournoi {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    editionName?: string;

    @Column({ nullable: true, default: 0 })
    edition?: number;

    @Column('timestamp', { nullable: true })
    annee?: Date;

    @OneToOne(() => TeamEntity, { nullable: true })
    @JoinColumn({ name: 'winner_id' })
    winner?: TeamEntity;

    @OneToMany(() => BetEntity, (bet) => bet.competition)
    bets?: BetEntity[];

    @ManyToOne(() => OrganizationEntity, (org) => org.tournois, { nullable: true }) // nullable for now for migration
    @JoinColumn({ name: 'organization_id' })
    organization?: OrganizationEntity;

    @Column({ nullable: true })
    slug?: string;

    @Column({ default: 'ACTIVE' })
    status?: string;

    @Column({ default: true })
    ticketsEnabled?: boolean;

    @Column({ default: true })
    bettingEnabled?: boolean;
}
