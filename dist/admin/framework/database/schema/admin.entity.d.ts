import { Admin } from "src/admin/domain";
import { TransactionEntity } from "src/transactions/framework/database/schema/transac.entity";
export declare class AdminEntity extends Admin {
    id: string;
    nom: string;
    email: string;
    password: string;
    transactions?: TransactionEntity[];
}
