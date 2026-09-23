import { MVP } from "../../../domain";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { AccountEntity } from "../../../../account/framework/database/schema/account.entity";
import { MatchEntity } from "../../../../match/framework/database/schema/match.entity";
import { TeamPlayerEntity } from "../../../../player/framework/database/schema/team-player.entity";
import { ATimestamp } from "../../../../_shared/framework/timestamp.abstract";

@Entity('mvp_votes')
export class MVPEntity extends ATimestamp implements MVP {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => AccountEntity, { eager: true })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @ManyToOne(() => MatchEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'match_id' })
    match: MatchEntity;

    @ManyToOne(() => TeamPlayerEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'team_player_id' })
    inscription: TeamPlayerEntity;

    @Column({ type: 'integer', default: 100 })
    amount: number;
}