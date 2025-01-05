import {
  BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { ITicketService } from 'src/Ticket/app/module';
import { ITicketRepository, Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { TicketFactory } from '../ticket.factory';
import { IUserRepository } from 'user/domain';
import { TicketDuration, TicketState } from 'src/ticket/domain/ticket.enum';
import { IMatchRepository, MatchState, MatchType } from 'src/match/domain';
  
@Injectable()
export class TicketService implements ITicketService {
  private readonly logger = new Logger();
  constructor(
    private ticketRepository: ITicketRepository, 
    private userRepository: IUserRepository,
    private matchRepository: IMatchRepository,
  ) {}

  async fetchAll(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.tickets.find({
        relations: { user: true }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TicketService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepository.tickets.findOne(
        {
          where: { id: id },
          relations: { user: true }
        }
      );
      if (ticket) {
        return ticket;
      }
      throw new NotFoundException('Ticket not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TicketService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Ticket>): Promise<Ticket> {
    return await this.ticketRepository.tickets.findOneBy({ ...data });
  }

  async add(data: TicketAccoutDTO): Promise<Ticket> {
    try {
      const { duree, amount, user, matchs } = data;

      const userExist = await this.userRepository.users.findOneByID(user);
      const matchExist = matchs.length > 0 ? await this.matchRepository.matchs.findByIds(matchs) : [];

      if (!userExist || !matchExist) {
        throw new NotFoundException('Utilisateur ou matchs non trouvé');
      }

      // Vérifier le solde de l'utilisateur
      if (userExist.solde < amount) {
        throw new ForbiddenException('Solde insuffisant pour acheter le ticket');
      }

      const ticket = await this.ticketRepository.tickets.create(
        await TicketFactory.create(data, userExist),
      );

      userExist.solde -= amount;

      await this.userRepository.users.update(userExist);

      return ticket;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TicketService.add');
      throw error;
    }
  }

  // async edit(data: UpdateTicketDTO): Promise<Ticket> {
  //   try {
  //     const { id, etat } = data;
  //     const ticket = id && (await this.ticketRepository.tickets.findOne(
  //       {
  //         where: { id: id },
  //         relations: { user: true }
  //       }
  //     ));
  //     if (ticket) {
  //       const currentDate = new Date();
  //       if (ticket.duree === TicketDuration.SIMPLE) {
          
  //       }
  //       return await this.ticketRepository.tickets.update(
  //         TicketFactory.update(ticket, data),
  //       );
  //     }
  //     throw new NotFoundException();
  //   } catch (error) {
  //     this.logger.error(error.message, 'ERROR::TicketService.editTicket');

  //     throw error;
  //   }
  // }

  async edit(data: UpdateTicketDTO): Promise<Ticket> {
    try {
      const { id, etat } = data;
      const ticket = id && (await this.ticketRepository.tickets.findOne({
        where: { id: id },
        relations: { user: true }
      }));
  
      if (ticket) {
        const currentDate = new Date();
  
        // Cas des tickets de type SIMPLE
        if (ticket.duree === TicketDuration.SIMPLE) {
          if (ticket.etat !== TicketState.VALIDE) {
            throw new BadRequestException('Le ticket a déjà été utilisé');
          }
          // Le ticket est utilisé immédiatement après le scan
          data.etat = TicketState.UTILISER;
        }
  
        // Cas des tickets pour la phase de groupe
        if (ticket.duree === TicketDuration.PHASE_POULE) {
          // Vérifier si la date de scan est déjà aujourd'hui
          if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
            throw new BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
          }
  
          // Mettre à jour la date du dernier scan
          data.lastScanDate = currentDate;
  
          // Si les phases de poule sont terminées, on passe l'état à UTILISER
          if (await this.areGroupStagesOver()) {
            data.etat = TicketState.UTILISER;
          }
        }
  
        // Cas des tickets pour tout le tournoi (similaire à PHASE_DE_GROUPE)
        if (ticket.duree === TicketDuration.TOURNOI_COMPLET) {
          if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
            throw new BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
          }
          data.lastScanDate = currentDate;
        }
  
        // Mettre à jour le ticket
        return await this.ticketRepository.tickets.update(TicketFactory.update(ticket, data));
      }
  
      throw new NotFoundException('Ticket non trouvé');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TicketService.editTicket');
      throw error;
    }
  }
  
  // Fonction utilitaire pour vérifier si deux dates sont le même jour
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Simuler une vérification de la fin des phases de poule
  async areGroupStagesOver(): Promise<boolean> {
    const matchs = await this.matchRepository.matchs.find({
      where: { type: MatchType.POULE }
    });
    // Vérifier si tous les matchs ont l'état 'terminé'
    const allMatchesFinished = matchs.every(match => match.etat === MatchState.TERMINER);

    return allMatchesFinished;
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const ticket = await this.ticketRepository.tickets.findOne(
        {
          where: { id: id },
          relations: { user: true }
        }
      );
      if (ticket) {
        return await this.ticketRepository.tickets.remove(ticket).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::TicketService.remove');
      return false;
    }
  }
}
