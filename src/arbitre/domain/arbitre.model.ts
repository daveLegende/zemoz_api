import { ITimestamp } from "../../_shared/domain/interface";
import { RoleArbitre } from "./arbitre.enum";
import { Match } from "../../match/domain";
import { Tournoi } from "../../tournoi/domain";

export class Arbitre extends ITimestamp {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    role?: RoleArbitre;
    matchs: Match[];
    tournoi?: Tournoi;
}