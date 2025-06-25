import { ATimestamp } from 'framework/timestamp.abstract';
import { Tournoi } from 'src/tournoi/domain';
export declare class TournoiEntity extends ATimestamp implements Tournoi {
    id: string;
    name: string;
    editionName?: string;
    edition?: number;
    annee?: Date;
}
