import { Column, Entity, Index, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Player } from 'src/player/domain';
import { Team } from 'src/team/domain';
import { TeamEntity } from 'src/team/framework/database/schema/team.entity';

@Entity('players')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class PlayerEntity extends ATimestamp implements Player {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ nullable: true, default: 18 })
    age: number;

    @Column()
    phone: string;

    @Column({ nullable: true, default: 0 })
    buts: number;

    @Column({ nullable: true, default: 0 })
    passes: number;

    @Column({ nullable: true })
    avatar: string;

    @ManyToOne(() => TeamEntity, (team) => team.joueurs)
    @JoinColumn({name: "team"})
    team: TeamEntity
}
