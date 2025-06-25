import { CategoryName } from "src/bet/domain";
export declare class OddsDto {
    V1?: number;
    V2?: number;
    X?: number;
    OUI?: number;
    NON?: number;
}
export declare class BetAccountDto {
    category: CategoryName;
    odds: OddsDto;
    match: string;
}
declare const UpdateBetDTO_base: import("@nestjs/common").Type<Partial<BetAccountDto>>;
export declare class UpdateBetDTO extends UpdateBetDTO_base {
    id: string;
}
export {};
