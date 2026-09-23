import { ITimestamp } from "../../_shared/domain/interface";
import { Team } from "../../team/domain";
import { Tournoi } from "../../tournoi/domain";

export class Poule extends ITimestamp {
    id: string;
    name: string;
    equipes: Team[];
    tournoi?: Tournoi;
}