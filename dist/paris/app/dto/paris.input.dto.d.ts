export interface ICreateParisDTO {
    odd: number;
    type: 'V1' | 'X' | 'V2';
    state: 'Pending' | 'Lost' | 'Won';
    amount: number;
    potentialGain: number;
    match: string;
    user: string;
    isWon: boolean;
    isPaid: boolean;
}
export interface IUpdateParisDTO extends Partial<ICreateParisDTO> {
    id: string;
}
