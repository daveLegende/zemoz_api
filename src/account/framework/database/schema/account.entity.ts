import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { SexEnum } from '../../../../user/domain';
import { PlatformRole } from '../../../domain/account.enum';
import { Account } from '../../../domain/account.model';
import { PrononsticEntity } from '../../../../prononstic/framework/database/schema/prono.entity';
import { TicketEntity } from '../../../../ticket/framework/database/schema/ticket.entity';
import { CouponEntity } from '../../../../coupon/framework/schema/coupon.entity';
import { TransactionEntity } from '../../../../transactions/framework/database/schema/transac.entity';
import { ParisEntity } from '../../../../paris/framework/schema/paris.entity';
import { OrganizationMemberEntity } from '../../../../organization/framework/database/schema/organization_member.entity';
import { TournoiMemberEntity } from '../../../../tournoi/framework/database/schema/tournoi_member.entity';

@Entity('accounts')
export class AccountEntity extends ATimestamp implements Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true, default: 0 })
  solde: number;

  @Column({ nullable: true, enum: SexEnum })
  sex?: SexEnum;

  @Column({ nullable: true })
  country?: string;

  @Column({ default: true })
  isActivated: boolean;

  @Exclude({ toClassOnly: true })
  @Column({ default: true })
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({
    type: 'enum',
    enum: PlatformRole,
    default: PlatformRole.USER,
  })
  platformRole: PlatformRole;

  @OneToMany(() => PrononsticEntity, pronostic => pronostic.account)
  pronostics?: PrononsticEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.account)
  tickets?: TicketEntity[];

  @OneToMany(() => CouponEntity, (coupon) => coupon.account, { nullable: true, onDelete: 'CASCADE' })
  bets?: CouponEntity[];

  @OneToMany(() => ParisEntity, (paris) => paris.account, { nullable: true, onDelete: 'CASCADE' })
  paris?: ParisEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account, { nullable: true, onDelete: 'CASCADE' })
  transactions?: TransactionEntity[];

  @OneToMany(() => OrganizationMemberEntity, (member) => member.account, { nullable: true, onDelete: 'CASCADE' })
  organizationMemberships?: OrganizationMemberEntity[];

  @OneToMany(() => TournoiMemberEntity, (member) => member.account, { nullable: true, onDelete: 'CASCADE' })
  tournoiMemberships?: TournoiMemberEntity[];
}
