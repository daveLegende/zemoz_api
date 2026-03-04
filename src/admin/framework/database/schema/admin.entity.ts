import { Admin } from "../../../domain";
import { TransactionEntity } from "../../../../transactions/framework/database/schema/transac.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => TransactionEntity, (transac) => transac.admin, { nullable: true, onDelete: 'CASCADE' })
    transactions?: TransactionEntity[];
}