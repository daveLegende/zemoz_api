import { ATimestamp } from '../../../_shared/framework/timestamp.abstract';
import {
  TournoiCoupon,
  TournoiCouponState,
} from '../../../tournoiCoupon/domain';
import { TournoiCouponBetEntity } from '../../../tournoiCouponBet/framework/schema/tournoi_coupon_bet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';

@Entity('tournoi_coupons')
export class TournoiCouponEntity extends ATimestamp implements TournoiCoupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.bets)
  user: UserEntity;

  @OneToMany(
    () => TournoiCouponBetEntity,
    (couponBet) => couponBet.tournoiCoupon,
  )
  tournoiCouponBets: TournoiCouponBetEntity[];

  @Column('float')
  totalOdds: number;

  @Column('float')
  gains: number;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: TournoiCouponState,
    default: TournoiCouponState.PENDING,
  })
  etat: TournoiCouponState;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isPaid: boolean;
}
