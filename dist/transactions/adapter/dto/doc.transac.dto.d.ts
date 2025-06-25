import { TransactionType } from "src/transactions/domain";
export declare class DocTransactionOutputDto {
    id: string;
    amount: number;
    type: TransactionType;
    user: string;
    admin?: string;
}
