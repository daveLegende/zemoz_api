import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { AccountEntity } from '../../../../account/framework/database/schema/account.entity';

export enum OrganizationRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

@Entity('organization_member')
@Unique(['organization', 'account'])
export class OrganizationMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrganizationEntity, (org) => org.members)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => AccountEntity, (acc) => acc.organizationMemberships, { eager: true })
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @Column({
    type: 'enum',
    enum: OrganizationRole,
    default: OrganizationRole.STAFF,
  })
  role: OrganizationRole;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
