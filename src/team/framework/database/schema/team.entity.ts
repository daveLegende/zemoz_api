import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Team } from '../../../../team/domain';
import { PouleEntity } from '../../../../poule/framework/database/schema/poule.entity';
import { MatchEntity } from '../../../../match/framework/database/schema/match.entity';
import { TournoiEntity } from '../../../../tournoi/framework/database/schema/tournoi.entity';
import { TeamPlayerEntity } from '../../../../player/framework/database/schema/team-player.entity';

@Entity('teams')
@Unique(['name', 'tournoi'])
export class TeamEntity extends ATimestamp implements Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    coach?: string;

    @Column({ nullable: true })
    commune?: string;

    @Column({ nullable: true, default: 0 })
    points?: number;

    @Column({ nullable: true, default: 0 })
    matchJoues?: number;

    @Column({ nullable: true, default: 0 })
    butMarques?: number;

    @Column({ nullable: true, default: 0 })
    butConcedes?: number;

    @Column({ nullable: true })
    logo?: string;

    @OneToMany(() => TeamPlayerEntity, (inscription) => inscription.team)
    inscriptions?: TeamPlayerEntity[];

    @ManyToOne(() => PouleEntity, (poule) => poule.equipes, { nullable: true })
    poule: PouleEntity;

    @OneToMany(() => MatchEntity, (match) => match.home)
    matchHome: MatchEntity[];

    @OneToMany(() => MatchEntity, (match) => match.away)
    matchAway: MatchEntity[];

    @ManyToOne(() => TournoiEntity, { nullable: true }) // nullable temporarily for migration
    @JoinColumn({ name: 'tournoi_id' })
    tournoi?: TournoiEntity;
}
