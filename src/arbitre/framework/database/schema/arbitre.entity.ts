import { Arbitre, RoleArbitre } from "src/arbitre/domain";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('arbitres')
export class ArbitreEntity extends Arbitre {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    avatar: string;

    @Column()
    phone: string;

    @Column({ nullable: true, enum: RoleArbitre, default: RoleArbitre.PRINCIPAL })
    role: RoleArbitre;

    @ManyToMany(() => MatchEntity, (match) => match.arbitres)
    matchs: MatchEntity[];

    @DeleteDateColumn()
    deleteDate?: Date; 

}