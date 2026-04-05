import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IMatchRepository } from '../../../match/domain';
import { IParisService } from '../../../paris/app/module';
import { Paris } from '../../../paris/domain';
import { IParisRepository } from '../../../paris/domain/data.abstract';
import { ParisAccountDto, UpdateParisDTO } from '../dto';
import { IUserRepository } from '../../../user/domain';
import { ParisFactory } from '../paris.factory';

@Injectable()
export class ParisService implements IParisService {
  private readonly logger = new Logger();
  constructor(
    private parisRepository: IParisRepository,
    private userRepository: IUserRepository,
    private matchRepository: IMatchRepository
  ) {}

  async fetchAll(): Promise<Paris[]> {
    try {
      return await this.parisRepository.paris.find({
        relations: { match: true, user: true, }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betsService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Paris> {
    try {
      const bets = await this.parisRepository.paris.findOne({
        where: { id: id },
        relations: { match: true }
      });
      if (bets) {
        return bets;
      }
      throw new NotFoundException('bets not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betsService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Paris>): Promise<Paris> {
    return await this.parisRepository.paris.findOneBy({ ...data });
  }

  async add(data: ParisAccountDto): Promise<Paris> {
    try {
      const { match, user, odd, type, potentialGain, amount } = data;
      

      if (type === null) {
        throw new NotFoundException("odds not found")
      } else {
        const matchExisted = await this.matchRepository.matchs.findOneByID(match);
        if(!matchExisted) throw new NotFoundException("Match non trouvé")
          
        const userExisted = await this.userRepository.users.findOneByID(user);
        if(!userExisted) throw new NotFoundException("Utilisateur non trouvé")

        if (userExisted.solde < amount) {
          throw new NotFoundException("Solde utilisateur insuffisant");
        }

        // Récupérer la cote actuelle selon l'option choisie
        const currentOdd = matchExisted.odds[type];

        const paris = new Paris();
        paris.match = matchExisted;
        paris.type = type;
        paris.odd = currentOdd;
        paris.amount = amount;
        paris.user = userExisted;
        paris.potentialGain = amount * currentOdd;

        userExisted.solde -= amount;

        await this.userRepository.users.update(userExisted);

        // const existed = await this.parisRepository.paris.findOne({
        //   where: {
        //     user: userExisted,
        //     match: matchExisted,
        //   }
        // });
        // if (existed)
        //   throw new ConflictException('bets already exist');

        return await this.parisRepository.paris.create(
          await ParisFactory.create(data, matchExisted, userExisted),
        );
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.add');
      throw error;
    }
  }

  async edit(data: UpdateParisDTO): Promise<Paris> {
    try {
      const { id } = data;
      const bets = id && (await this.parisRepository.paris.findOne({
        where: { id: id },
        relations: { match: true }
      }));
      if (bets) {
        return await this.parisRepository.paris.update(
          ParisFactory.update(bets, data, bets.match, bets.user),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.editbets');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const bets = await this.parisRepository.paris.findOne({
        where: { id: id },
        relations: { match: true , user: true,}
      });
      if (bets) {
        return await this.parisRepository.paris.remove(bets).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.remove');
      return false;
    }
  }

  async getPendingParisForMatch(id: string): Promise<Paris[]> {
    try {

      const match = await this.matchRepository.matchs.findOneByID(id);

      if(!match) throw new NotFoundException("Aucun match trouvé avec cet ID");

      const paris = await this.parisRepository.paris.find({
        where: { match: {id: id} },
        relations: { match: true , user: true,}
      });
      if (paris.length > 0) {
        return paris;
      } else {
        return [];
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.remove');
      throw error;
    }
  }

    async updateParisStatus(id: string): Promise<boolean> {
    try {

      const match = await this.matchRepository.matchs.findOneByID(id);

      if(!match) throw new NotFoundException("Aucun match trouvé avec cet ID");

      const paris = await this.parisRepository.paris.find({
        where: { match: {id: id} },
        relations: { match: true , user: true,}
      });
      if (paris.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::betservice.remove');
      throw error;
    }
  }
}
