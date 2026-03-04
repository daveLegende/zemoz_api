import { Match } from "../../match/domain";
import { ICreateParisDTO, IUpdateParisDTO } from "../app/dto";
import { Paris } from "../domain";
import { User } from "../../user/domain";

export abstract class ParisFactory {
    static async create(data: ICreateParisDTO, match: Match, user: User): Promise<Paris> {
        const paris = new Paris();

        paris.match = match;
        paris.user = user;
        paris.amount = data.amount;
        paris.potentialGain = data.potentialGain;
        paris.type = data.type;
        paris.isPaid = data.isPaid;
        paris.isWon = data.isWon;
        paris.odd = data.odd;
        paris.state = data.state;

        return paris;
    }

    static update(paris: Paris, data: IUpdateParisDTO, match: Match, user: User): Paris {

      paris.type = data.type ?? paris.type;
      paris.odd = data.odd ?? paris.odd;
      paris.isPaid = data.isPaid ?? paris.isPaid;
      paris.isWon = data.isWon ?? paris.isWon;
      paris.amount = data.amount;
      paris.potentialGain = data.potentialGain ?? paris.potentialGain;
      paris.match = match ?? paris.match;
      paris.user = user ?? paris.user;
      paris.state = data.state ?? paris.state;

      return paris
    }
    
    static getParis(paris: Paris): Paris {
      if (paris) {
        return {
          id: paris.id,
          odd: paris.odd,
          match: paris.match,
          user: paris.user,
          isPaid: paris.isPaid,
          isWon: paris.isWon,
          potentialGain: paris.potentialGain,
          amount: paris.amount,
          type: paris.type,
          state: paris.state,
          createdAt: paris.createdAt,
          updatedAt: paris.updatedAt,
          deletedAt: paris.deletedAt
        };
      }
    }
}