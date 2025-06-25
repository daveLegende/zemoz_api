import { ITimestamp } from "domain/interface";
import { Team } from "src/team/domain";
export declare class Poule extends ITimestamp {
    id: string;
    name: string;
    equipes: Team[];
}
