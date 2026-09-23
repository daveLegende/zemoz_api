import { Admin } from "../../../domain";
import { TransactionEntity } from "../../../../transactions/framework/database/schema/transac.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrganizationMemberEntity } from "../../../../organization/framework/database/schema/organization_member.entity";

@Entity('admins')
export class AdminEntity extends Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nom: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isSuperAdmin?: boolean;

    @OneToMany(() => TransactionEntity, (transac) => transac.admin, { nullable: true, onDelete: 'CASCADE' })
    transactions?: TransactionEntity[];

    @OneToMany(() => OrganizationMemberEntity, (member) => member.admin)
    memberships?: OrganizationMemberEntity[];
}