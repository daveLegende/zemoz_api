import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from 'framework/timestamp.abstract';
import { HalfPauseState, Match, MatchScores, MatchState, MatchType } from 'src/match/domain';
import { PouleEntity } from 'src/poule/framework/database/schema/poule.entity';
import { TeamEntity } from 'src/team/framework/database/schema/team.entity';
import { ArbitreEntity } from 'src/arbitre/framework/database/schema/arbitre.entity';
import { MatchEventEntity } from 'src/matchEvents/framework/database/schema/match.event.entity';
import { PrononsticEntity } from 'src/prononstic/framework/database/schema/prono.entity';
import { BetEntity } from 'src/bet/framework/schema/bet.entity';
import { TicketEntity } from 'src/ticket/framework/database/schema/ticket.entity';
import { OddsDTO } from 'src/match/import { IDParamDTO } from '../../../ _shared / adapter / dto';/odds.dto';
import { ParisEntity } from 'src/paris/framework/schema/paris.entity';

@Entity('matchs')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class MatchEntity extends ATimestamp implements Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    lieu: string;

    @Column({
        type: 'enum',
        enum: MatchType,
    })
    type: MatchType;

    @Column({
        type: 'enum',
        enum: MatchState,
        nullable: true,
        default: MatchState.A_VENIR
    })
    etat?: MatchState;

    @Column({ nullable: true, default: 0 })
    journee?: number;

    @Column('timestamp')
    date: Date;

    // @Column()
    // home: string;

    // @Column()
    // away: string;

    @ManyToOne(() => TeamEntity, (team) => team.matchHome, { nullable: false })
    @JoinColumn({ name: 'home' })
    home: TeamEntity;

    @ManyToOne(() => TeamEntity, (team) => team.matchAway, { nullable: false })
    @JoinColumn({ name: 'away' })
    away: TeamEntity;

    @Column('jsonb', { nullable: true, default: { "home": 0, "away": 0 } },)
    scores?: MatchScores;

    @OneToMany(() => MatchEventEntity, (event) => event.match, { cascade: true })
    events?: MatchEventEntity[];

    @ManyToOne(() => PouleEntity, (poule) => poule.matches, { nullable: true })
    @JoinColumn({ name: 'poule' })
    poule?: PouleEntity;

    @ManyToMany(() => ArbitreEntity, (arbitre) => arbitre.matchs)
    @JoinTable({ name: "matchs_arbitres" })
    arbitres: ArbitreEntity[]

    @OneToMany(() => PrononsticEntity, pronostic => pronostic.match)
    pronostics?: PrononsticEntity[];

    @OneToMany(() => BetEntity, (bet) => bet.match)
    bets?: BetEntity[];

    @OneToMany(() => ParisEntity, (paris) => paris.match)
    paris?: ParisEntity[];

    @Column({ nullable: true, default: false })
    isProlongation?: boolean;

    @Column({ nullable: true, default: false })
    isTirAuxButs?: boolean;

    @Column({ nullable: true, default: 0 })
    homePenalty?: number;

    @Column({ nullable: true, default: 0 })
    awayPenalty?: number;

    @Column({ nullable: true })
    teamQualify?: string;

    // @Column({ default: false })
    // isHalfTime: boolean;

    @Column({
        type: 'enum',
        enum: HalfPauseState,
        nullable: true,
        default: HalfPauseState.FIRST_HALF
    })
    halfPauseState?: HalfPauseState;
}