import { ATimestamp } from "../../../_shared/framework/timestamp.abstract";
import { BetEntity } from "../../../bet/framework/schema/bet.entity";
import { BetStatus } from "../../../couponBet/domain";
import { TournoiCouponEntity } from "../../../tournoiCoupon/framework/schema/tournoi_coupon.entity";
import { TournoiCouponBet } from "../../../tournoiCouponBet/domain";
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
