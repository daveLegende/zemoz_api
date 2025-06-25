import { TransactionType } from "src/transactions/domain";
export declare class DocTransactionOutputDto {
    id: string;
    amount: number;
    frais: number;
    type: TransactionType;
    phone: string;
    admin?: string;
    user?: string;
}
