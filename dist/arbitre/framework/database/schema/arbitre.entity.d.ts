import { Arbitre, RoleArbitre } from "src/arbitre/domain";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
export declare class ArbitreEntity extends Arbitre {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    role: RoleArbitre;
    matchs: MatchEntity[];
    deleteDate?: Date;
}
