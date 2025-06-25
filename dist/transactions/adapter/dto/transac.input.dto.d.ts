import { TransactionType } from "src/transactions/domain/";
export declare class TransactionAccountDto {
    amount: number;
    type: TransactionType;
    phone: string;
    admin?: string;
}
declare const UpdateTransactionDTO_base: import("@nestjs/common").Type<Partial<TransactionAccountDto>>;
export declare class UpdateTransactionDTO extends UpdateTransactionDTO_base {
    id: string;
}
export declare class PassAccountDto {
    pass: string;
}
declare const UpdatePassDTO_base: import("@nestjs/common").Type<Partial<PassAccountDto>>;
export declare class UpdatePassDTO extends UpdatePassDTO_base {
    id: string;
}
export {};
