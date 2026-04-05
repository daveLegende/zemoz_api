import { ITimestamp } from "../../_shared/domain/interface";
import { Team } from "../../team/domain";

export class Poule extends ITimestamp {
    id: string;
    name: string;
    equipes: Team[];
}