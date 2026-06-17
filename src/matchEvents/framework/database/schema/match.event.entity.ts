import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { MatchEntity } from "../../../../match/framework/database/schema/match.entity";
import { MatchEvent } from "../../../../matchEvents/domain";
import { PlayerEntity } from "../../../../player/framework/database/schema/player.entity";
import { TeamEntity } from "../../../../team/framework/database/schema/team.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('match_events')
export class MatchEventEntity extends ATimestamp implements MatchEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @ManyToOne(() => TeamEntity, { nullable: false })
  @JoinColumn({ name: 'teamId' })
  equipe: TeamEntity;

  @ManyToOne(() => PlayerEntity, { nullable: false })
  @JoinColumn({ name: 'playerId' })
  joueur: PlayerEntity;

  @Column('int')
  minute: number;

  @ManyToOne(() => MatchEntity, (match) => match.events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;
}