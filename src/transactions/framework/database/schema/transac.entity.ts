import { AdminEntity } from "../../../../admin/framework/database/schema/admin.entity";
import { Transaction, TransactionType } from "../../../domain";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../../../user/framework/database/schema/user.entity";
import { ATimestamp } from "../../../../_shared/framework/timestamp.abstract";

@Entity('transactions')
export class TransactionEntity extends ATimestamp implements Transaction {
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

    @Column({ type: 'float', default: 0 })
    frais?: number;

    @Column()
    phone: string;

    @ManyToOne(() => AdminEntity, (admin) => admin.transactions, { nullable: true })
    admin?: AdminEntity;

    @ManyToOne(() => UserEntity, (user) => user.transactions, { nullable: true })
    user?: UserEntity;
}