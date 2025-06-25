import { AdminEntity } from "src/admin/framework/database/schema/admin.entity";
import { Transaction } from "src/transactions/domain";
export declare class TransactionEntity extends Transaction {
    id: string;
    amount: number;
    phone: string;
    admin?: AdminEntity;
}
