import { ITimestamp } from "domain/interface";
export declare class Admin extends ITimestamp {
    id: string;
    nom: string;
    email: string;
    password: string;
}
