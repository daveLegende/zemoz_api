import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { TicketDuration, TicketPosition, TicketState, TicketType } from '../../../../ticket/domain/ticket.enum';
import { UserEntity } from '../../../../user/framework/database/schema/user.entity';
import { MatchEntity } from '../../../../match/framework/database/schema/match.entity';
import { Ticket } from '../../../../ticket/domain';

// @Entity('tickets')
// // @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
// export class TicketEntity extends ATimestamp implements Ticket {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({ type: 'enum', enum: TicketType, default: TicketType.STARNDARD })
//     type: TicketType;

//     @Column({ type: 'enum', enum: TicketDuration, default: TicketDuration.SIMPLE })
//     duree: TicketDuration;

//     @Column({ type: 'enum', enum: TicketState, default: TicketState.VALIDE })
//     etat: TicketState;

//     @ManyToOne(() => UserEntity, (user) => user.tickets, { nullable: false })
//     user: UserEntity;

//     @Column({ type: 'decimal' })
//     amount: number;

//     @Column('timestamp')
//     date: Date;

//     @Column({ type: 'timestamp', nullable: true })
//     lastScanDate: Date;

//     // Pour un ticket simple
//     @Column('text', { array: true, default: [] })
//     matchs: string[];

//     @Column({ default: false })
//     isDeleted: boolean;
// }

@Entity('tickets')
export class TicketEntity extends ATimestamp implements Ticket {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  qrCode: string;

  @Column({ default: "" })
  code?: string; // code unique pour le scan

  @Column({ type: 'enum', enum: TicketType, default: TicketType.STANDARD })
  type: TicketType;

  @Column({ type: 'enum', enum: TicketDuration, default: TicketDuration.SIMPLE })
  duree: TicketDuration;

  @Column({ type: 'enum', enum: TicketState, default: TicketState.VALIDE })
  etat: TicketState;

  @Column({ type: 'enum', enum: TicketPosition, default: TicketPosition.SORTIE })
  position: TicketPosition;

  @ManyToOne(() => UserEntity, (user) => user.tickets, { nullable: false })
  user: UserEntity;

  @ManyToMany(() => MatchEntity)
  @JoinTable()
  matchs: MatchEntity[];

  @Column({ type: 'decimal' })
  amount: number;

  @Column('timestamp')
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastScanDate: Date;

  @Column({ default: false })
  isDeleted: boolean;
}

