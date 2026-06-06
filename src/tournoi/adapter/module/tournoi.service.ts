import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ITournoiService } from '../../app/module';
import { ITournoiRepository, Tournoi } from '../../domain';
import { TournoiAccoutDTO, UpdateTournoiDTO } from '../dto';
import { TournoiFactory } from '../tournoi.factory';
import { PlayerFactory } from '../../../player/adapter/player.factory';
import { PlayerAccoutDTO } from '../../../player/adapter/dto';
import { IPlayerRepository } from '../../../player/domain';

@Injectable()
export class TournoiService implements ITournoiService {
  private readonly logger = new Logger();
  constructor(private tournoiRepository: ITournoiRepository) {}

  async fetchAll(): Promise<Tournoi[]> {
    try {
      return await this.tournoiRepository.tournois.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TournoiService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Tournoi> {
    try {
      const tournoi = await this.tournoiRepository.tournois.findOne({
        where: { id: id },
      });
      if (tournoi) {
        return tournoi;
      }
      throw new NotFoundException('Tournoi not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TournoiService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Tournoi>): Promise<Tournoi> {
    return await this.tournoiRepository.tournois.findOneBy({ ...data });
  }

  async add(data: TournoiAccoutDTO): Promise<Tournoi> {
    try {
      const { name, editionName, edition, annee } = data;
      const existed = await this.tournoiRepository.tournois.findOneBy({ name });
      if (existed) throw new ConflictException('Tournoi already exist');

      const tournoi = await this.tournoiRepository.tournois.create(
        await TournoiFactory.create(data),
      );

      console.log(tournoi);

      return tournoi;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TournoiService.add');
      throw error;
    }
  }

  async edit(data: UpdateTournoiDTO): Promise<Tournoi> {
    try {
      const { id } = data;
      const tournoi =
        id &&
        (await this.tournoiRepository.tournois.findOne({
          where: { id: id },
        }));
      if (tournoi) {
        return await this.tournoiRepository.tournois.update(
          TournoiFactory.update(tournoi, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TournoiService.editTournoi');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const tournoi = await this.tournoiRepository.tournois.findOne({
        where: { id: id },
      });
      if (tournoi) {
        return await this.tournoiRepository.tournois
          .remove(tournoi)
          .then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TournoiService.remove');
      return false;
    }
  }
}
