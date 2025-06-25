import { ITimestamp } from "domain/interface";
import { Match } from "src/match/domain";
import { User } from "user/domain";
export declare class Paris extends ITimestamp {
    id: string;
    odd: number;
    type: 'V1' | 'X' | 'V2';
    state: 'Pending' | 'Lost' | 'Won';
    amount: number;
    potentialGain: number;
    match: Match;
    user: User;
    isWon: boolean;
    isPaid: boolean;
}
