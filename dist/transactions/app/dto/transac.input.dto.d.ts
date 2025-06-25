import { TransactionType } from "src/transactions/domain/transaction.enum";
export interface ICreateTransactionDTO {
    type: TransactionType;
    amount: number;
    phone: string;
    admin?: string;
}
export interface ICreatePassDTO {
    pass: string;
}
export interface IUpdateTransactionDTO extends Partial<ICreateTransactionDTO> {
    id: string;
}
export interface IUpdatePassDTO extends Partial<ICreatePassDTO> {
    id: string;
}
