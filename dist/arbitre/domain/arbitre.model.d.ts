import { ITimestamp } from "domain/interface";
import { RoleArbitre } from "./arbitre.enum";
import { Match } from "src/match/domain";
export declare class Arbitre extends ITimestamp {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    role?: RoleArbitre;
    matchs: Match[];
}
