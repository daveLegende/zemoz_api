import { ATimestamp } from '../../../../_shared/framework/timestamp.abstract';
import { Poule } from '../../../../poule/domain/poule.model';
import { TeamEntity } from '../../../../team/framework/database/schema/team.entity';
import { MatchEntity } from '../../../../match/framework/database/schema/match.entity';
import { TournoiEntity } from '../../../../tournoi/framework/database/schema/tournoi.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";

@Entity('poules')
@Unique(['name', 'tournoi'])
export class PouleEntity extends ATimestamp implements Poule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => TeamEntity, (team) => team.poule)
    equipes: TeamEntity[]

    @OneToMany(() => MatchEntity, (match) => match.poule)
    matches: MatchEntity[]

    @ManyToOne(() => TournoiEntity, { nullable: true })
    @JoinColumn({ name: 'tournoi_id' })
    tournoi?: TournoiEntity;
}