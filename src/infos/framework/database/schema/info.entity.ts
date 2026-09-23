import { Info } from "../../../../infos/domain";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TournoiEntity } from "../../../../tournoi/framework/database/schema/tournoi.entity";

@Entity('infos')
export class InfoEntity extends Info {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    desc: string;

    @ManyToOne(() => TournoiEntity, { nullable: true })
    @JoinColumn({ name: 'tournoi_id' })
    tournoi?: TournoiEntity;
}