import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Poule } from "src/poule/domain";
import { TeamEntity } from "src/team/framework/database/schema/team.entity";
export declare class PouleEntity extends Poule {
    id: string;
    name: string;
    equipes: TeamEntity[];
    matches: MatchEntity[];
}
