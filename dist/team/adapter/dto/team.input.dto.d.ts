import { Player } from 'src/player/domain';
export declare class TeamAccoutDTO {
    name: string;
    coach: string;
    commune: string;
    points?: number;
    matchJoues?: number;
    butMarques?: number;
    butConcedes?: number;
    joueurs: Player[];
    logo?: string;
}
declare const UpdateTeamDTO_base: import("@nestjs/common").Type<Partial<TeamAccoutDTO>>;
export declare class UpdateTeamDTO extends UpdateTeamDTO_base {
    id: string;
}
export {};
