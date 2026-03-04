import { ATimestamp } from "../../../_shared/framework/timestamp.abstract";
import { BetEntity } from "../../../bet/framework/schema/bet.entity";
import { CouponEntity } from "../../../coupon/framework/schema/coupon.entity";
import { BetStatus, CouponBet } from "../../../couponBet/domain";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('coupon_bets')
export class CouponBetEntity extends ATimestamp implements CouponBet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => CouponEntity, (coupon) => coupon.couponBets)
    coupon: CouponEntity;

    @ManyToOne(() => BetEntity, (bet) => bet.couponBets)
    bet: BetEntity;

    @Column('jsonb')
    selectedOptions: Record<string, number>;

    @Column({ type: 'enum', enum: BetStatus, default: BetStatus.PENDING })
    status: BetStatus;
}
