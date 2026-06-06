import { ATimestamp } from '../../../_shared/framework/timestamp.abstract';
import { Coupon, CouponState } from '../../../coupon/domain';
import { CouponBetEntity } from '../../../couponBet/framework/schema/coupon_bet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';

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

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isPaid: boolean;
}
