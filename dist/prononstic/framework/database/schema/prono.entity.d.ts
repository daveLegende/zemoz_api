import { ATimestamp } from "framework/timestamp.abstract";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Prononstic, PronoState } from "src/prononstic/domain";
import { UserEntity } from "user/framework/database/schema/user.entity";
export declare class PrononsticEntity extends ATimestamp implements Prononstic {
    id: string;
    date: Date;
    homeScore: number;
    awayScore: number;
    etat: PronoState;
    user: UserEntity;
    match: MatchEntity;
}
