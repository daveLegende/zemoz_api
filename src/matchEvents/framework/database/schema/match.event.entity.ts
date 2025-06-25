import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { MatchEvent } from "src/matchEvents/domain";
import { PlayerEntity } from "src/player/framework/database/schema/player.entity";
import { TeamEntity } from "src/team/framework/database/schema/team.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('match_events')
export class MatchEventEntity extends MatchEvent {
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

  @ManyToOne(() => MatchEntity, (match) => match.events)
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;
}