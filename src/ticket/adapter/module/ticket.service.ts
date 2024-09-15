import {
  BadRequestException,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { ITicketService } from 'src/Ticket/app/module';
import { ITicketRepository, Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { TicketFactory } from '../ticket.factory';
import { IUserRepository } from 'user/domain';
import { TicketDuration } from 'src/ticket/domain/ticket.enum';
  
  @Injectable()
  export class TicketService implements ITicketService {
    private readonly logger = new Logger();
    constructor(private ticketRepository: ITicketRepository, private userRepository: IUserRepository) {}
  
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
        const { duree, amount, user } = data;

        const userExist = await this.userRepository.users.findOneByID(user);
        
        if (!userExist) {
          throw new NotFoundException('Utilisateur non trouvé');
        }
    
        // Vérifier le solde de l'utilisateur
        if (userExist.solde < amount) {
          throw new BadRequestException('Solde insuffisant pour acheter le ticket');
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
  
    async edit(data: UpdateTicketDTO): Promise<Ticket> {
      try {
        const { id } = data;
        const ticket = id && (await this.ticketRepository.tickets.findOne(
          {
            where: { id: id },
            relations: { user: true }
          }
        ));
        if (ticket) {
          return await this.ticketRepository.tickets.update(
            TicketFactory.update(ticket, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TicketService.editTicket');
  
        throw error;
      }
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
  