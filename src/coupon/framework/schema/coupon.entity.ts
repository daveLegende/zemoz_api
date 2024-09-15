import { ATimestamp } from "framework/timestamp.abstract";
import { BetEntity } from "src/bet/framework/schema/bet.entity";
import { Coupon, CouponState } from "src/coupon/domain";
import { CouponBetEntity } from "src/couponBet/framework/schema/coupon_bet.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "user/framework/database/schema/user.entity";

@Entity('coupons')
export class CouponEntity extends ATimestamp implements Coupon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.bets)
    user: UserEntity;

    @OneToMany(() => CouponBetEntity, (couponBet) => couponBet.coupon)
    couponBets: CouponBetEntity[];

    @Column('float')
    totalOdds: number;

    @Column('float')
    gains: number;

    @Column()
    amount: number;

    @Column({ type: 'enum', enum: CouponState, default: CouponState.PENDING })
    etat: CouponState;
}
