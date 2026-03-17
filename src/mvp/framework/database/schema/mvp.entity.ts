import { MVP } from "../../../domain";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../../../user/framework/database/schema/user.entity";
import { MatchEntity } from "../../../../match/framework/database/schema/match.entity";
import { PlayerEntity } from "../../../../player/framework/database/schema/player.entity";
import { ATimestamp } from "../../../../_shared/framework/timestamp.abstract";

@Entity('mvp_votes')
export class MVPEntity extends ATimestamp implements MVP {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => PlayerEntity, { eager: true })
    @JoinColumn({ name: 'player_id' })
    player: PlayerEntity;

    @Column({ type: 'integer', default: 100 })
    amount: number;

}