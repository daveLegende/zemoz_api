import { AdminEntity } from "src/admin/framework/database/schema/admin.entity";
import { Transaction } from "src/transactions/domain";
import { UserEntity } from "user/framework/database/schema/user.entity";
export declare class TransactionEntity extends Transaction {
    id: string;
    amount: number;
    frais?: number;
    phone: string;
    admin?: AdminEntity;
    user?: UserEntity;
}
