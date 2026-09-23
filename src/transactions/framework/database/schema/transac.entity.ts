import { AccountEntity } from "../../../../account/framework/database/schema/account.entity";
import { Transaction, TransactionType } from "../../../domain";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
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

    @ManyToOne(() => AccountEntity, (account) => account.transactions, { nullable: true })
    @JoinColumn({ name: 'account_id' })
    account?: AccountEntity;
}