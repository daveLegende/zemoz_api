export declare class PlayerAccoutDTO {
    firstname: string;
    lastname: string;
    age?: number;
    phone: string;
    buts?: number;
    passes?: number;
    team: string;
    avatar?: string;
}
declare const UpdatePlayerDTO_base: import("@nestjs/common").Type<Partial<PlayerAccoutDTO>>;
export declare class UpdatePlayerDTO extends UpdatePlayerDTO_base {
    id: string;
}
export {};
