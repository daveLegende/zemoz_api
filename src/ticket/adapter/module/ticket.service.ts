import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ITicketService } from '../../../ticket/app/module';
import { ITicketRepository, Ticket } from '../../../ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { TicketFactory } from '../ticket.factory';
import { IUserRepository } from '../../../user/domain';
import { TicketDuration, TicketState } from '../../../ticket/domain/ticket.enum';
import { IMatchRepository, MatchState, MatchType } from 'src/match/domain';
import { randomUUID } from 'crypto';
import * as crypto from 'crypto';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketService implements ITicketService {
  private readonly logger = new Logger();
  constructor(
    private ticketRepository: ITicketRepository,
    private userRepository: IUserRepository,
    private matchRepository: IMatchRepository,
  ) { }

  private generateQrCode(userId: string): string {
    const raw = randomUUID() + userId + Date.now();
    return crypto.createHash('sha256').update(raw).digest('hex');
  }


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

  private async generateTicketIdentifier(): Promise<{
    barcode: string;
    qrCodeImage: string;
  }> {
    const uuid = randomUUID();
    const timestamp = Date.now().toString().slice(-6);

    const barcode = `TKT${timestamp}${Math.random().toString().slice(2, 9)}`.substring(0, 13);

    const qrData = {
      ticketId: uuid,
      shortCode: barcode,
      createdAt: new Date().toISOString(),
    };

    const qrCodeData = JSON.stringify(qrData);

    // 🔥 Générer une image QR Code en base64
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    return { barcode, qrCodeImage };
  }


  async add(data: TicketAccoutDTO): Promise<Ticket> {
    const { amount, user, matchs } = data;

    const userExist = await this.userRepository.users.findOneByID(user);
    if (!userExist) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const matchExist = matchs?.length
      ? await this.matchRepository.matchs.findByIds(matchs)
      : [];

    if (matchs?.length && matchExist.length !== matchs.length) {
      throw new NotFoundException('Un ou plusieurs matchs sont introuvables');
    }

    if (userExist.solde < amount) {
      throw new ForbiddenException('Solde insuffisant');
    }

    const { barcode, qrCodeImage } = await this.generateTicketIdentifier();

    const ticket = await this.ticketRepository.tickets.create(
      await TicketFactory.create({
        ...data,
        code: barcode,          // Human readable code
        qrCode: qrCodeImage,    // Base64 Image
        date: new Date(),
      } as any, userExist, matchExist),
    );

    userExist.solde -= amount;
    await this.userRepository.users.update(userExist);

    return ticket;
  }

  // async add(data: TicketAccoutDTO): Promise<Ticket> {
  //   const { amount, user, matchs } = data;

  //   const userExist = await this.userRepository.users.findOneByID(user);
  //   if (!userExist) {
  //     throw new NotFoundException('Utilisateur introuvable');
  //   }

  //   const matchExist = matchs?.length
  //     ? await this.matchRepository.matchs.findByIds(matchs)
  //     : [];

  //   if (matchs?.length && matchExist.length !== matchs.length) {
  //     throw new NotFoundException('Un ou plusieurs matchs sont introuvables');
  //   }

  //   if (userExist.solde < amount) {
  //     throw new ForbiddenException('Solde insuffisant');
  //   }

  //   const qrCode = this.generateQrCode(userExist.id);

  //   const ticket = await this.ticketRepository.tickets.create(
  //     await TicketFactory.create({
  //       ...data,
  //       qrCode,
  //       date: new Date(),
  //     } as any, userExist, matchExist),
  //   );

  //   userExist.solde -= amount;
  //   await this.userRepository.users.update(userExist);

  //   return ticket;
  // }


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

  async scanTicket(qrCode: string): Promise<Ticket> {

    const ticket = await this.ticketRepository.tickets.findOne({
      where: { qrCode },
      relations: { matchs: true, user: true },
    });

    if (!ticket) {
      throw new NotFoundException('QR Code invalide');
    }

    if (ticket.etat === TicketState.SUPPRIMER) {
      throw new BadRequestException('Ticket supprimé');
    }

    const now = new Date();

    switch (ticket.duree) {

      // Ticket SIMPLE
      case TicketDuration.SIMPLE:
        if (ticket.etat === TicketState.UTILISER) {
          throw new BadRequestException('Ticket déjà utilisé');
        }
        ticket.etat = TicketState.UTILISER;
        break;

      // PHASE DE POULE
      case TicketDuration.PHASE_POULE:
        if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
          throw new BadRequestException('Ticket déjà scanné aujourd’hui');
        }

        ticket.lastScanDate = now;

        if (await this.areGroupStagesOver()) {
          ticket.etat = TicketState.UTILISER;
        }
        break;

      // TOURNOI COMPLET
      case TicketDuration.TOURNOI_COMPLET:
        if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
          throw new BadRequestException('Ticket déjà scanné aujourd’hui');
        }

        ticket.lastScanDate = now;

        if (await this.isTournamentOver()) {
          ticket.etat = TicketState.UTILISER;
        }
        break;
    }

    return await this.ticketRepository.tickets.update(ticket);
  }

  async isTournamentOver(): Promise<boolean> {
    const matchs = await this.matchRepository.matchs.find();
    return matchs.every(m => m.etat === MatchState.TERMINER);
  }
}