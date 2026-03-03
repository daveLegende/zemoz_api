import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { User } from '../../../domain';
import { SexEnum } from '../../../domain';
import { PrononsticEntity } from '../../../../prononstic/framework/database/schema/prono.entity';
import { TicketEntity } from '../../../../ticket/framework/database/schema/ticket.entity';
import { Coupon } from '../../../../coupon/domain';
import { CouponEntity } from '../../../../coupon/framework/schema/coupon.entity';
import { TransactionEntity } from '../../../../transactions/framework/database/schema/transac.entity';
import { ParisEntity } from '../../../../paris/framework/schema/paris.entity';

@Entity('user')
@Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class UserEntity extends ATimestamp implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phone: string;

  @Column({ nullable: true, default: 0 })
  solde: number;

  @Column({ nullable: true, enum: SexEnum })
  sex: SexEnum;

  @Column({ nullable: true })
  country?: string;

  @Column({ default: true })
  isActivated: boolean;

  @Exclude({ toClassOnly: true })
  @Column({ default: true })
  password: string;

  @Column({ default: false })
  askForReset: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => PrononsticEntity, pronostic => pronostic.user)
  pronostics: PrononsticEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.user)
  tickets: TicketEntity[];

  @OneToMany(() => CouponEntity, (coupon) => coupon.user, { nullable: true, onDelete: 'CASCADE' })
  bets?: CouponEntity[];

  @OneToMany(() => ParisEntity, (paris) => paris.user, { nullable: true, onDelete: 'CASCADE' })
  paris?: ParisEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user, { nullable: true, onDelete: 'CASCADE' })
  transactions?: TransactionEntity[];
}
