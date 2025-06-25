import { ITimestamp } from "domain/interface";
import { TransactionType } from "./transaction.enum";
import { Admin } from "src/admin/domain";
export declare class Transaction extends ITimestamp {
    id: string;
    type: TransactionType;
    amount: number;
    phone: string;
    admin?: Admin;
}
