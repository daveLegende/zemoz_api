import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from 'framework/timestamp.abstract';
import { TicketDuration, TicketState, TicketType } from 'src/ticket/domain/ticket.enum';
import { UserEntity } from 'user/framework/database/schema/user.entity';
import { MatchEntity } from 'src/match/framework/database/schema/match.entity';
import { Ticket } from 'src/ticket/domain';

@Entity('tickets')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class TicketEntity extends ATimestamp implements Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: TicketType, default: TicketType.STARNDARD })
    type: TicketType;

    @Column({ type: 'enum', enum: TicketDuration, default: TicketDuration.SIMPLE })
    duree: TicketDuration;

    @Column({ type: 'enum', enum: TicketState, default: TicketState.VALIDE })
    etat: TicketState;

    @ManyToOne(() => UserEntity, (user) => user.tickets, { nullable: false })
    user: UserEntity;

    @Column({ type: 'decimal' })
    amount: number;

    @Column('timestamp')
    date: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastScanDate: Date;

    // Pour un ticket simple
    @Column('text', { array: true, default: [] })
    matchs: string[];

    @Column({ default: false })
    isDeleted: boolean;
}
