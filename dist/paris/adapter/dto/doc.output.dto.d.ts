export declare class DocParisOutputDto {
    id: string;
    matchId: string;
    odd: number;
    type: 'V1' | 'X' | 'V2';
    state: 'Pending' | 'Lost' | 'Won';
    amount: number;
    potentialGain: number;
    isWon: boolean;
    isPaid: boolean;
    userId: string;
}
