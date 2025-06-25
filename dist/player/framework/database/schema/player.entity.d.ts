import { ATimestamp } from 'framework/timestamp.abstract';
import { Player } from 'src/player/domain';
import { TeamEntity } from 'src/team/framework/database/schema/team.entity';
export declare class PlayerEntity extends ATimestamp implements Player {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    phone: string;
    buts: number;
    passes: number;
    avatar: string;
    team: TeamEntity;
}
