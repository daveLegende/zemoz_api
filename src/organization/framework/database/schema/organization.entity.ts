import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrganizationMemberEntity } from './organization_member.entity';
import { TournoiEntity } from '../../../../tournoi/framework/database/schema/tournoi.entity';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: 'ACTIVE' })
  status: string;

  @OneToMany(() => OrganizationMemberEntity, (member) => member.organization)
  members: OrganizationMemberEntity[];

  @OneToMany(() => TournoiEntity, (tournoi) => tournoi.organization)
  tournois: TournoiEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
