import { ATimestamp } from "framework/timestamp.abstract";
import { Bet, CategoryName } from "src/bet/domain";
import { CouponBetEntity } from "src/couponBet/framework/schema/coupon_bet.entity";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

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
    
    @Column('uuid', { nullable: true })
    competitionId?: string;

    @OneToMany(() => CouponBetEntity, (couponBet) => couponBet.bet)
    couponBets: CouponBetEntity[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    closedAt?: Date;
}
