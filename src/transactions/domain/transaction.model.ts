import { ITimestamp } from "../../_shared/domain/interface";
import { TransactionType } from "./transaction.enum";
import { Account } from "../../account/domain/account.model";

export class Transaction extends ITimestamp {
    id: string;
    type: TransactionType;
    amount: number;
    frais?: number;
    phone: string;
    account?: Account;
}