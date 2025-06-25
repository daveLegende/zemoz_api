import { PronoState } from 'src/prononstic/domain';
export declare class PrononsticAccoutDTO {
    user: string;
    match: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    etat: PronoState;
}
declare const UpdatePrononsticDTO_base: import("@nestjs/common").Type<Partial<PrononsticAccoutDTO>>;
export declare class UpdatePrononsticDTO extends UpdatePrononsticDTO_base {
    id: string;
}
export {};
