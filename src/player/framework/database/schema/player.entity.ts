import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Player } from '../../../../player/domain';
import { TeamPlayerEntity } from './team-player.entity';

@Entity('players')
export class PlayerEntity extends ATimestamp implements Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, default: 18 })
    age: number;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => TeamPlayerEntity, (inscription) => inscription.player)
    inscriptions?: TeamPlayerEntity[];
}
