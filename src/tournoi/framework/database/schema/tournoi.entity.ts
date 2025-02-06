import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Tournoi } from 'src/tournoi/domain';

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
}
