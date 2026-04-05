import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Poule } from '../../../../poule/domain/poule.model';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';
import { MatchEntity } from '../../../../match/framework/database/schema/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('poules')
export class PouleEntity extends ATimestamp implements Poule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => TeamEntity, (team) => team.poule)
    equipes: TeamEntity[]

    @OneToMany(() => MatchEntity, (match) => match.poule)
    matches: MatchEntity[]
}