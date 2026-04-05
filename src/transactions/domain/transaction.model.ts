import { ITimestamp } from "../../_shared/domain/interface";
import { TransactionType } from "./transaction.enum";
import { User } from "../../user/domain";
import { Admin } from "../../admin/domain";

export class Transaction extends ITimestamp {
    id: string;
    type: TransactionType;
    amount: number;
    frais?: number;
    phone: string;
    admin?: Admin;
    user?: User;
}