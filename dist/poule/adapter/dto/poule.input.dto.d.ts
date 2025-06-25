export declare class PouleAccountDto {
    name: string;
    equipes: string[];
}
declare const UpdatePouleDTO_base: import("@nestjs/common").Type<Partial<PouleAccountDto>>;
export declare class UpdatePouleDTO extends UpdatePouleDTO_base {
    id: string;
}
export {};
