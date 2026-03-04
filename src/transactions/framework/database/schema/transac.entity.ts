import { AdminEntity } from "../../../../admin/framework/database/schema/admin.entity";
import { Transaction, TransactionType } from "../../../domain";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../../user/framework/database/schema/user.entity";

@Entity('transactions')
export class TransactionEntity extends Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionType,
        nullable: true,
        default: TransactionType.DEPOT
    })
    type: TransactionType;

    @Column('float')
    frais?: number;

    @Column()
    phone: string;

    @ManyToOne(() => AdminEntity, (admin) => admin.transactions, { nullable: true })
    admin?: AdminEntity;

    @ManyToOne(() => UserEntity, (user) => user.transactions, { nullable: true })
    user?: UserEntity;
}