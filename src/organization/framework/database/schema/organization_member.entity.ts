import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { AdminEntity } from '../../../../admin/framework/database/schema/admin.entity';

export enum OrganizationRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

@Entity('organization_member')
@Unique(['organization', 'admin'])
export class OrganizationMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrganizationEntity, (org) => org.members)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  @ManyToOne(() => AdminEntity, { eager: true })
  @JoinColumn({ name: 'admin_id' })
  admin: AdminEntity;

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
