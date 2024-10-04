import { ITimestamp } from "domain/interface";
import { TransactionType } from "./transaction.enum";
import { User } from "user/domain";
import { Admin } from "src/admin/domain";

export class Transaction extends ITimestamp {
    id: string;
    type: TransactionType;
    amount: number;
    phone: string;
    admin?: Admin;
}