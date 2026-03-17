import { MVP } from "../domain";
import { PlayerEntity } from "../../player/framework/database/schema/player.entity";
import { UserEntity } from "../../user/framework/database/schema/user.entity";
import { MVPEntity } from "../framework/database/schema/mvp.entity";

export abstract class MVPFactory {

    // Création d'un nouveau vote MVP
    static create(user: UserEntity, player: PlayerEntity): MVPEntity {
        const mvp = new MVPEntity();

        mvp.user = user;
        mvp.player = player;

        return mvp;
    }

    // Exemple pour récupérer les infos du vote (DTO)
    static getMvp(mvp: MVP) {
        if (!mvp) return null;

        return {
            id: mvp.id,
            user: mvp.user,
            player: mvp.player,
            amount: mvp.amount,
            createdAt: mvp.createdAt,
            updatedAt: mvp.updatedAt,
        };
    }
}