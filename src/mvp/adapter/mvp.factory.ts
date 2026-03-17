import { MVP } from "../domain";
import { User } from "../../user/domain";
import { Player } from "../../player/domain";

export abstract class MVPFactory {

    // Création d'un nouveau vote MVP
    static async create(user: User, player: Player): Promise<MVP> {
        const mvp = new MVP();

        mvp.user = user;
        mvp.player = player;

        // amount est déjà fixé à 100 FCFA par défaut
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