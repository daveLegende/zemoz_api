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
import { TicketDuration, TicketPosition, TicketState } from '../../../ticket/domain/ticket.enum';
import { IMatchRepository, MatchState, MatchType } from '../../../match/domain';
import { randomUUID } from 'crypto';
import * as crypto from 'crypto';
import * as QRCode from 'qrcode';
import { Between, FindOptionsWhere } from 'typeorm';

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

  private async generateTicketIdentifier(
    userId: string,
    matchDate: Date
  ): Promise<{
    barcode: string;
    qrCodeImage: string;
  }> {
    const uuid = randomUUID();
    const timestamp = Date.now().toString().slice(-6);

    const barcode = `TKT${timestamp}${Math.random().toString().slice(2, 9)}`.substring(0, 13);

    const payload = {
      ticketId: uuid,
      shortCode: barcode,
      userId: userId,
      matchDate: matchDate.toISOString(),
      createdAt: new Date().toISOString(),
    };

    const payloadString = JSON.stringify(payload);

    const signature = crypto
      .createHmac('sha256', process.env.QR_SECRET!)
      .update(payloadString)
      .digest('hex');

    const qrData = JSON.stringify({
      payload,
      signature
    });

    const qrCodeImage = await QRCode.toDataURL(qrData);

    return { barcode, qrCodeImage };
  }


  private verifyQrCode(qrCode: string): any {
    try {
      const parsed = JSON.parse(qrCode);

      const { payload, signature } = parsed;

      const expectedSignature = crypto
        .createHmac('sha256', process.env.QR_SECRET!)
        .update(JSON.stringify(payload))
        .digest('hex');

      if (signature !== expectedSignature) {
        throw new BadRequestException('QR Code falsifié');
      }

      return payload;

    } catch (e) {
      throw new BadRequestException('QR Code invalide');
    }
  }


  async add(data: TicketAccoutDTO): Promise<Ticket> {
    const { amount, user, matchs, date } = data;  // date = date des matchs

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

    // Normaliser la date des matchs (ignorer l'heure pour la comparaison)
    const normalizedMatchDate = matchExist[0].date;

    const { barcode, qrCodeImage } = await this.generateTicketIdentifier(
      userExist.id,
      normalizedMatchDate
    );

    const ticket = await this.ticketRepository.tickets.create(
      await TicketFactory.create({
        ...data,
        code: barcode,
        qrCode: qrCodeImage,
        date: normalizedMatchDate,  // Date des matchs
        position: TicketPosition.SORTIE,  // Initialement en dehors
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const ticketMatchDate = new Date(ticket.date);
        ticketMatchDate.setHours(0, 0, 0, 0);

        // Vérifier si le ticket est valide pour aujourd'hui (date des matchs)
        if (ticketMatchDate.getTime() !== today.getTime()) {
          throw new BadRequestException(
            `Ce ticket est valable uniquement pour les matchs du ${ticketMatchDate.toLocaleDateString()}. ` +
            `Aujourd'hui nous sommes le ${today.toLocaleDateString()}`
          );
        }

        // Cas des tickets de type SIMPLE
        if (ticket.duree === TicketDuration.SIMPLE) {
          if (ticket.etat !== TicketState.VALIDE) {
            throw new BadRequestException('Le ticket a déjà été utilisé');
          }
          if (ticket.position === TicketPosition.ENTREE) {
            throw new BadRequestException('Vous êtes déjà à l\'intérieur');
          }
          data.etat = TicketState.UTILISER;
          data.position = TicketPosition.ENTREE;
          data.lastScanDate = currentDate;
        }

        // Cas des tickets pour la phase de groupe
        if (ticket.duree === TicketDuration.PHASE_POULE) {
          // Vérifier si c'est un jour de match de poule
          const isGroupMatchDay = await this.isGroupMatchDay(today);
          if (!isGroupMatchDay) {
            throw new BadRequestException('Aucun match de poule prévu aujourd\'hui');
          }

          // Vérifier si la date de scan est déjà aujourd'hui
          if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
            throw new BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
          }

          // Mettre à jour la date du dernier scan
          data.lastScanDate = currentDate;

          // Alterner entre entrée et sortie
          data.position = ticket.position === TicketPosition.SORTIE
            ? TicketPosition.ENTREE
            : TicketPosition.SORTIE;

          // Si les phases de poule sont terminées, on passe l'état à UTILISER
          if (await this.areGroupStagesOver()) {
            data.etat = TicketState.UTILISER;
          }
        }

        // Cas des tickets pour tout le tournoi
        if (ticket.duree === TicketDuration.TOURNOI_COMPLET) {
          // Vérifier si c'est un jour de match
          const isMatchDay = await this.isMatchDay(today);
          if (!isMatchDay) {
            throw new BadRequestException('Aucun match prévu aujourd\'hui');
          }

          // Vérifier si la date de scan est déjà aujourd'hui
          if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
            throw new BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
          }

          data.lastScanDate = currentDate;

          // Alterner entre entrée et sortie
          data.position = ticket.position === TicketPosition.SORTIE
            ? TicketPosition.ENTREE
            : TicketPosition.SORTIE;

          // Si le tournoi est terminé, on passe l'état à UTILISER
          if (await this.isTournamentOver()) {
            data.etat = TicketState.UTILISER;
          }
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

  // async scanTicket(qrCode: string): Promise<Ticket> {

  //   const ticket = await this.ticketRepository.tickets.findOne({
  //     where: { qrCode },
  //     relations: { matchs: true, user: true },
  //   });

  //   if (!ticket) {
  //     throw new NotFoundException('QR Code invalide');
  //   }

  //   if (ticket.etat === TicketState.SUPPRIMER) {
  //     throw new BadRequestException('Ticket supprimé');
  //   }

  //   const now = new Date();

  //   switch (ticket.duree) {

  //     // Ticket SIMPLE
  //     case TicketDuration.SIMPLE:
  //       if (ticket.etat === TicketState.UTILISER) {
  //         throw new BadRequestException('Ticket déjà utilisé');
  //       }
  //       ticket.etat = TicketState.UTILISER;
  //       break;

  //     // PHASE DE POULE
  //     case TicketDuration.PHASE_POULE:
  //       if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
  //         throw new BadRequestException('Ticket déjà scanné aujourd’hui');
  //       }

  //       ticket.lastScanDate = now;

  //       if (await this.areGroupStagesOver()) {
  //         ticket.etat = TicketState.UTILISER;
  //       }
  //       break;

  //     // TOURNOI COMPLET
  //     case TicketDuration.TOURNOI_COMPLET:
  //       if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
  //         throw new BadRequestException('Ticket déjà scanné aujourd’hui');
  //       }

  //       ticket.lastScanDate = now;

  //       if (await this.isTournamentOver()) {
  //         ticket.etat = TicketState.UTILISER;
  //       }
  //       break;
  //   }

  //   return await this.ticketRepository.tickets.update(ticket);
  // }

  async scanTicket(qrCode: string): Promise<Ticket> {
    // 1. Vérifier signature QR
    const payload = this.verifyQrCode(qrCode);

    // 2. Récupérer ticket avec lock
    const ticket = await this.ticketRepository.tickets.findOne({
      where: { id: payload.ticketId },
      relations: { matchs: true, user: true },
    });

    if (!ticket) {
      throw new NotFoundException('QR Code invalide');
    }

    if (ticket.etat === TicketState.SUPPRIMER) {
      throw new BadRequestException('Ticket supprimé');
    }

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Vérification de la date des matchs (date du ticket)
    const ticketMatchDate = new Date(ticket.date);
    ticketMatchDate.setHours(0, 0, 0, 0);

    // Le ticket n'est valable que le jour des matchs
    if (ticketMatchDate.getTime() !== today.getTime()) {
      throw new BadRequestException(
        `Ce ticket est valable uniquement pour les matchs du ${ticketMatchDate.toLocaleDateString()}. ` +
        `Aujourd'hui nous sommes le ${today.toLocaleDateString()}`
      );
    }

    switch (ticket.duree) {
      // Ticket SIMPLE
      case TicketDuration.SIMPLE:
        if (ticket.etat === TicketState.UTILISER) {
          throw new BadRequestException('Ticket déjà utilisé');
        }
        if (ticket.position === TicketPosition.ENTREE) {
          throw new BadRequestException('Vous êtes déjà à l\'intérieur');
        }
        ticket.etat = TicketState.UTILISER;
        ticket.position = TicketPosition.ENTREE;
        ticket.lastScanDate = now;
        break;

      // PHASE DE POULE - valable pour tous les matchs de poule
      case TicketDuration.PHASE_POULE:
        // Vérifier si c'est un jour de match de poule
        const isGroupMatchDay = await this.isGroupMatchDay(today);
        if (!isGroupMatchDay) {
          throw new BadRequestException('Aucun match de poule prévu aujourd\'hui');
        }

        // Vérifier si déjà scanné aujourd'hui
        if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
          throw new BadRequestException('Ce ticket a déjà été scanné aujourd\'hui');
        }

        // Gestion entrée/sortie
        if (ticket.position === TicketPosition.SORTIE) {
          ticket.position = TicketPosition.ENTREE;
          this.logger.log(`Ticket ${ticket.id}: Entrée phase poule à ${now.toISOString()}`);
        } else {
          ticket.position = TicketPosition.SORTIE;
          this.logger.log(`Ticket ${ticket.id}: Sortie phase poule à ${now.toISOString()}`);
        }
        ticket.lastScanDate = now;

        // Si toutes les phases de poule sont terminées, le ticket est utilisé
        if (await this.areGroupStagesOver()) {
          ticket.etat = TicketState.UTILISER;
        }
        break;

      // TOURNOI COMPLET - valable pour toute la durée du tournoi
      case TicketDuration.TOURNOI_COMPLET:
        // Vérifier si c'est un jour de match
        const isMatchDay = await this.isMatchDay(today);
        if (!isMatchDay) {
          throw new BadRequestException('Aucun match prévu aujourd\'hui');
        }

        // Vérifier si déjà scanné aujourd'hui
        if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, now)) {
          throw new BadRequestException('Ce ticket a déjà été scanné aujourd\'hui');
        }

        // Gestion entrée/sortie
        if (ticket.position === TicketPosition.SORTIE) {
          ticket.position = TicketPosition.ENTREE;
          this.logger.log(`Ticket ${ticket.id}: Entrée tournoi complet à ${now.toISOString()}`);
        } else {
          ticket.position = TicketPosition.SORTIE;
          this.logger.log(`Ticket ${ticket.id}: Sortie tournoi complet à ${now.toISOString()}`);
        }
        ticket.lastScanDate = now;

        // Si le tournoi est terminé, le ticket est utilisé
        if (await this.isTournamentOver()) {
          ticket.etat = TicketState.UTILISER;
        }
        break;
    }

    return await this.ticketRepository.tickets.update(ticket);
  }


  // Vérifier si c'est un jour avec des matchs de poule
  async isGroupMatchDay(date: Date): Promise<boolean> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const where: FindOptionsWhere<any> = {
      type: MatchType.POULE,
      date: Between(startOfDay, endOfDay)
    };

    const matchs = await this.matchRepository.matchs.find({ where });

    return matchs.length > 0;
  }

  // Vérifier si c'est un jour avec des matchs (tous types)
  async isMatchDay(date: Date): Promise<boolean> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const where: FindOptionsWhere<any> = {
      date: Between(startOfDay, endOfDay)
    };

    const matchs = await this.matchRepository.matchs.find({ where });

    return matchs.length > 0;
  }

  async isTournamentOver(): Promise<boolean> {
    const matchs = await this.matchRepository.matchs.find();
    return matchs.every(m => m.etat === MatchState.TERMINER);
  }
}