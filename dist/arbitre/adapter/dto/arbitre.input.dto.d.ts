import { RoleArbitre } from "src/arbitre/domain";
export declare class ArbitreAccountDto {
    name: string;
    avatar: string;
    phone: string;
    role?: RoleArbitre;
}
declare const UpdateArbitreDTO_base: import("@nestjs/common").Type<Partial<ArbitreAccountDto>>;
export declare class UpdateArbitreDTO extends UpdateArbitreDTO_base {
    id: string;
}
export {};
