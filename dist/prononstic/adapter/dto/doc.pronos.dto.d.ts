import { PronoState } from 'src/prononstic/domain';
export declare class DocPrononsticOutputDTO {
    id: string;
    user: string;
    match: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    etat: PronoState;
}
