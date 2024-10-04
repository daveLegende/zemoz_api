import { ITimestamp } from "domain/interface";

export class Admin extends ITimestamp {
    id: string;
    nom: string;
    email: string;
    password: string;
}