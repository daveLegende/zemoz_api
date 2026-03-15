import { MVP } from "../../../domain";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../../../user/framework/database/schema/user.entity";
import { MatchEntity } from "../../../../match/framework/database/schema/match.entity";
import { PlayerEntity } from "../../../../player/framework/database/schema/player.entity";

@Entity('mvp_votes')
export class MVPEntity extends MVP {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => MatchEntity, { eager: true })
    @JoinColumn({ name: 'match_id' })
    match: MatchEntity;

    @ManyToOne(() => PlayerEntity, { eager: true })
    @JoinColumn({ name: 'player_id' })
    player: PlayerEntity;

    @Column({ type: 'integer', default: 100 })
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}