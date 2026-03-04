import { ATimestamp } from "../../../_shared/framework/timestamp.abstract";
import { MatchEntity } from "../../../match/framework/database/schema/match.entity";
import { Paris } from "../../../paris/domain";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "../../../user/framework/database/schema/user.entity";

@Entity('paris')
export class ParisEntity extends ATimestamp implements Paris {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'enum',
        enum: ['V1', 'X', 'V2'],
    })
    type: 'V1' | 'X' | 'V2';

    @Column({ 
        type: 'enum',
        enum: ['Pending', 'Lost', 'Won'],
        default: 'Pending',
    })
    state: 'Pending' | 'Lost' | 'Won';

    @Column({type: 'float'})
    odd: number;

    @Column({type: 'float'})
    amount: number;

    @Column({type: 'float'})
    potentialGain: number;

    @ManyToOne(() => MatchEntity, (match) => match.paris)
    match: MatchEntity;

    @ManyToOne(() => UserEntity, (user) => user.paris)
    user: UserEntity;

    @Column({ default: false })
    isWon: boolean;

    @Column({ default: false })
    isPaid: boolean;
}