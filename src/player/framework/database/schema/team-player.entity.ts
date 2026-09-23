import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';
import { TeamPlayer } from '../../../domain/team-player.model';
import { PlayerEntity } from './player.entity';

@Entity('team_players')
@Unique(['player', 'team'])
export class TeamPlayerEntity extends ATimestamp implements TeamPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PlayerEntity, (player) => player.inscriptions, { nullable: false })
  @JoinColumn({ name: 'player_id' })
  player: PlayerEntity;

  @ManyToOne(() => TeamEntity, (team) => team.inscriptions, { nullable: false })
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @Column({ nullable: true })
  numeroMaillot?: number;

  @Column({ nullable: true })
  poste?: string;

  @Column({ default: 0 })
  buts: number;

  @Column({ default: 0 })
  passes: number;

  @Column({ nullable: true, default: 'ACTIF' })
  statut?: string;
}
