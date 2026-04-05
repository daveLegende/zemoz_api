import { Info } from "../../../../infos/domain";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}