import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Player } from 'src/player/domain';
import { Team } from 'src/team/domain';
import { PlayerEntity } from 'src/player/framework/database/schema/player.entity';
import { PouleEntity } from 'src/poule/framework/database/schema/poule.entity';
import { MatchEntity } from 'src/match/framework/database/schema/match.entity';

@Entity('teams')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class TeamEntity extends ATimestamp implements Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    coach: string;

    @Column()
    commune: string;

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

    @OneToMany(() => PlayerEntity, (player) => player.team)
    // @JoinColumn({ name:  })
    joueurs: PlayerEntity[]

    @ManyToOne(() => PouleEntity, (poule) => poule.equipes, { nullable: true })
    poule: PouleEntity;

    @OneToMany(() => MatchEntity, (match) => match.home)
    matchHome: MatchEntity[];

    @OneToMany(() => MatchEntity, (match) => match.away)
    matchAway: MatchEntity[]
}
