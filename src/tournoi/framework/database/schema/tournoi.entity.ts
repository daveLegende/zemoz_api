import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Tournoi } from '../../../../tournoi/domain';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';

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
}
