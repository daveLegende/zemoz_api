export declare class TournoiAccoutDTO {
    name: string;
    editionName: string;
    edition?: number;
    annee?: Date;
}
declare const UpdateTournoiDTO_base: import("@nestjs/common").Type<Partial<TournoiAccoutDTO>>;
export declare class UpdateTournoiDTO extends UpdateTournoiDTO_base {
    id: string;
}
export {};
