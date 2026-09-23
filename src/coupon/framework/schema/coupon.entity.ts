import { ATimestamp } from "../../../_shared/framework/timestamp.abstract";
import { Coupon, CouponState } from "../../../coupon/domain";
import { CouponBetEntity } from "../../../couponBet/framework/schema/coupon_bet.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { AccountEntity } from "../../../account/framework/database/schema/account.entity";
import { TournoiEntity } from "../../../tournoi/framework/database/schema/tournoi.entity";

@Entity('coupons')
export class CouponEntity extends ATimestamp implements Coupon {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => AccountEntity, (account) => account.bets)
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

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

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    isPaid: boolean;

    @ManyToOne(() => TournoiEntity, { nullable: true })
    @JoinColumn({ name: 'tournoi_id' })
    tournoi?: TournoiEntity;
}
