import { MVP } from "../domain";
import { MatchEntity } from "../../match/framework/database/schema/match.entity";
import { TeamPlayerEntity } from "../../player/framework/database/schema/team-player.entity";
import { AccountEntity } from "../../account/framework/database/schema/account.entity";
import { MVPEntity } from "../framework/database/schema/mvp.entity";

export abstract class MVPFactory {
    static create(account: AccountEntity, match: MatchEntity, inscription: TeamPlayerEntity): MVPEntity {
        const mvp = new MVPEntity();
        mvp.account = account;
        mvp.match = match;
        mvp.inscription = inscription;
        return mvp;
    }

    static getMvp(mvp: MVP) {
        if (!mvp) return null;

        return {
            id: mvp.id,
            account: mvp.account,
            match: mvp.match,
            inscription: mvp.inscription,
            amount: mvp.amount,
            createdAt: mvp.createdAt,
            updatedAt: mvp.updatedAt,
        };
    }
}