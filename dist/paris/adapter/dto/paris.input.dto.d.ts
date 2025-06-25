export declare class ParisAccountDto {
    match: string;
    odd: number;
    type: 'V1' | 'X' | 'V2';
    state: 'Pending' | 'Lost' | 'Won';
    amount: number;
    potentialGain: number;
    isWon: boolean;
    isPaid: boolean;
    user: string;
}
declare const UpdateParisDTO_base: import("@nestjs/common").Type<Partial<ParisAccountDto>>;
export declare class UpdateParisDTO extends UpdateParisDTO_base {
    id: string;
}
export {};
