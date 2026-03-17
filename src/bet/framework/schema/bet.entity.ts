import { ATimestamp } from "../../../_shared/framework/timestamp.abstract";
import { Bet, CategoryName } from "../../../bet/domain";
import { CouponBetEntity } from "../../../couponBet/framework/schema/coupon_bet.entity";
import { MatchEntity } from "../../../match/framework/database/schema/match.entity";
import { TournoiEntity } from "../../../tournoi/framework/database/schema/tournoi.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity('bets')
export class BetEntity extends ATimestamp implements Bet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'enum',
        enum: CategoryName,
    })
    category: CategoryName;

    @Column('jsonb')
    odds: Record<string, number>;

    @ManyToOne(() => MatchEntity, (match) => match.bets)
    match: MatchEntity;
    
    @ManyToOne(() => TournoiEntity, (tournoi) => tournoi.bets, { nullable: true })
    @JoinColumn({ name: 'competitionId' })
    competition?: TournoiEntity;

    @OneToMany(() => CouponBetEntity, (couponBet) => couponBet.bet)
    couponBets: CouponBetEntity[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    closedAt?: Date;
}
