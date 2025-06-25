import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ATimestamp } from 'framework/timestamp.abstract';
import { User } from 'user/domain';
import { SexEnum } from 'user/domain';
import { PrononsticEntity } from 'src/prononstic/framework/database/schema/prono.entity';
import { TicketEntity } from 'src/ticket/framework/database/schema/ticket.entity';
import { Coupon } from 'src/coupon/domain';
import { CouponEntity } from 'src/coupon/framework/schema/coupon.entity';
import { TransactionEntity } from 'src/transactions/framework/database/schema/transac.entity';

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

  @Column()
  country: string;

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

  @OneToMany(() => CouponEntity, (coupon) => coupon.user, { nullable: true,  onDelete: 'CASCADE' })
  bets?: CouponEntity[];
}
