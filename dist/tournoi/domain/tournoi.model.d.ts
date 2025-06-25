import { ITimestamp } from 'domain/interface';
export declare class Tournoi extends ITimestamp {
    id: string;
    name: string;
    editionName?: string;
    edition?: number;
    annee?: Date;
}
