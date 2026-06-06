import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Player } from '../../../../player/domain';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';

@Entity('players')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class PlayerEntity extends ATimestamp implements Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: 18 })
  age: number;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true, default: 0 })
  buts?: number;

  @Column({ nullable: true, default: 0 })
  passes?: number;

  @Column({ nullable: true })
  avatar?: string;

  @ManyToOne(() => TeamEntity, (team) => team.joueurs)
  @JoinColumn({ name: 'team' })
  team: TeamEntity;
}
