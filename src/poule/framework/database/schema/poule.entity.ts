import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Poule } from "src/poule/domain";
import { TeamEntity } from "src/team/framework/database/schema/team.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('poules')
export class PouleEntity extends Poule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => TeamEntity, (team) => team.poule)
    equipes: TeamEntity[]

    @OneToMany(() => MatchEntity, (match) => match.poule)
    matches: MatchEntity[]
}