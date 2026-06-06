import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Team } from '../../../../team/domain';
import { PlayerEntity } from '../../../../player/framework/database/schema/player.entity';
import { PouleEntity } from '../../../../poule/framework/database/schema/poule.entity';
import { MatchEntity } from '../../../../match/framework/database/schema/match.entity';

@Entity('teams')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
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

  @OneToMany(() => PlayerEntity, (player) => player.team)
  // @JoinColumn({ name:  })
  joueurs: PlayerEntity[];

  @ManyToOne(() => PouleEntity, (poule) => poule.equipes, { nullable: true })
  poule: PouleEntity;

  @OneToMany(() => MatchEntity, (match) => match.home)
  matchHome: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.away)
  matchAway: MatchEntity[];
}
