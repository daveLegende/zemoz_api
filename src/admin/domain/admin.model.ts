import { ITimestamp } from "../../_shared/domain/interface";

export class Admin extends ITimestamp {
    id: string;
    nom: string;
    email: string;
    password: string;
}