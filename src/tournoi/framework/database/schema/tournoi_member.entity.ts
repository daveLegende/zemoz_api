import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountEntity } from '../../../../account/framework/database/schema/account.entity';
import { TournoiEntity } from './tournoi.entity';
import { TournoiRole } from '../../../domain/tournoi.enum';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';

export { TournoiRole };

@Entity('tournoi_member')
@Unique(['tournoi', 'account'])
export class TournoiMemberEntity extends ATimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TournoiEntity)
  @JoinColumn({ name: 'tournoi_id' })
  tournoi: TournoiEntity;

  @ManyToOne(() => AccountEntity, (account) => account.tournoiMemberships)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({
    type: 'enum',
    enum: TournoiRole,
  })
  role: TournoiRole;

  @Column({ default: true })
  isActive: boolean;
}
