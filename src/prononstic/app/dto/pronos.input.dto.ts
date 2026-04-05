import { PronoState } from "../../domain";

export interface ICreatePronosDTO {
    user: string;

    match: string;

    homeScore: number;

    awayScore: number;

    date: Date;

    etat?: PronoState;
}

export interface IUpdatePronosDTO extends Partial<ICreatePronosDTO> {
    id: string;
    
}