import { ATimestamp } from "framework/timestamp.abstract";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Paris } from "src/paris/domain";
import { UserEntity } from "user/framework/database/schema/user.entity";
export declare class ParisEntity extends ATimestamp implements Paris {
    id: string;
    type: 'V1' | 'X' | 'V2';
    state: 'Pending' | 'Lost' | 'Won';
    odd: number;
    amount: number;
    potentialGain: number;
    match: MatchEntity;
    user: UserEntity;
    isWon: boolean;
    isPaid: boolean;
}
