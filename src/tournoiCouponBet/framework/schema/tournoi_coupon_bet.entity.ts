import { ATimestamp } from "framework/timestamp.abstract";
import { BetEntity } from "src/bet/framework/schema/bet.entity";
import { BetStatus, CouponBet } from "src/couponBet/domain";
import { TournoiCouponEntity } from "src/tournoiCoupon/framework/schema/tournoi_coupon.entity";
import { TournoiCouponBet } from "src/tournoiCouponBet/domain";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('tournoi_coupon_bets')
export class TournoiCouponBetEntity extends ATimestamp implements TournoiCouponBet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => TournoiCouponEntity, (tournoiCoupon) => tournoiCoupon.tournoiCouponBets)
    tournoiCoupon: TournoiCouponEntity;

    @ManyToOne(() => BetEntity, (bet) => bet.couponBets)
    bet: BetEntity;

    @Column('jsonb')
    selectedOptions: Record<string, number>;

    @Column({ type: 'enum', enum: BetStatus, default: BetStatus.PENDING })
    status: BetStatus;
}
