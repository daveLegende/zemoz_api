import { ATimestamp } from "../../../../_shared/framework/timestamp.abstract";
import { MatchEntity } from "../../../../match/framework/database/schema/match.entity";
import { Prononstic, PronoState } from "../../../../prononstic/domain";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { AccountEntity } from "../../../../account/framework/database/schema/account.entity";


@Entity('pronos')
// @Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class PrononsticEntity extends ATimestamp implements Prononstic {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @Column()
    homeScore: number;

    @Column()
    awayScore: number;

    @Column({
        type: 'enum',
        enum: PronoState,
    })
    etat: PronoState;

    @ManyToOne(() => AccountEntity , (account) => account.pronostics, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: AccountEntity;

    @ManyToOne(() => MatchEntity, (match) => match.pronostics, { nullable: false, onDelete: 'CASCADE' })
    match: MatchEntity;
}
