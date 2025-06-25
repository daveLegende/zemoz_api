export declare class InfoAccountDto {
    image: string;
    title: string;
    desc: string;
}
declare const UpdateInfoDTO_base: import("@nestjs/common").Type<Partial<InfoAccountDto>>;
export declare class UpdateInfoDTO extends UpdateInfoDTO_base {
    id: string;
}
export {};
