"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const ticket_factory_1 = require("../ticket.factory");
const domain_2 = require("../../../user/domain");
const ticket_enum_1 = require("../../domain/ticket.enum");
const domain_3 = require("../../../match/domain");
let TicketService = class TicketService {
    constructor(ticketRepository, userRepository, matchRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.ticketRepository.tickets.find({
                relations: { user: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TicketService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const ticket = await this.ticketRepository.tickets.findOne({
                where: { id: id },
                relations: { user: true }
            });
            if (ticket) {
                return ticket;
            }
            throw new common_1.NotFoundException('Ticket not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TicketService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.ticketRepository.tickets.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { duree, amount, user, matchs } = data;
            const userExist = await this.userRepository.users.findOneByID(user);
            const matchExist = matchs.length > 0 ? await this.matchRepository.matchs.findByIds(matchs) : [];
            if (!userExist || !matchExist) {
                throw new common_1.NotFoundException('Utilisateur ou matchs non trouvé');
            }
            if (userExist.solde < amount) {
                throw new common_1.ForbiddenException('Solde insuffisant pour acheter le ticket');
            }
            const ticket = await this.ticketRepository.tickets.create(await ticket_factory_1.TicketFactory.create(data, userExist));
            userExist.solde -= amount;
            await this.userRepository.users.update(userExist);
            return ticket;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TicketService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const { id, etat } = data;
            const ticket = id && (await this.ticketRepository.tickets.findOne({
                where: { id: id },
                relations: { user: true }
            }));
            if (ticket) {
                const currentDate = new Date();
                if (ticket.duree === ticket_enum_1.TicketDuration.SIMPLE) {
                    if (ticket.etat !== ticket_enum_1.TicketState.VALIDE) {
                        throw new common_1.BadRequestException('Le ticket a déjà été utilisé');
                    }
                    data.etat = ticket_enum_1.TicketState.UTILISER;
                }
                if (ticket.duree === ticket_enum_1.TicketDuration.PHASE_POULE) {
                    if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
                        throw new common_1.BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
                    }
                    data.lastScanDate = currentDate;
                    if (await this.areGroupStagesOver()) {
                        data.etat = ticket_enum_1.TicketState.UTILISER;
                    }
                }
                if (ticket.duree === ticket_enum_1.TicketDuration.TOURNOI_COMPLET) {
                    if (ticket.lastScanDate && this.isSameDay(ticket.lastScanDate, currentDate)) {
                        throw new common_1.BadRequestException('Le ticket a déjà été scanné aujourd\'hui');
                    }
                    data.lastScanDate = currentDate;
                }
                return await this.ticketRepository.tickets.update(ticket_factory_1.TicketFactory.update(ticket, data));
            }
            throw new common_1.NotFoundException('Ticket non trouvé');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TicketService.editTicket');
            throw error;
        }
    }
    isSameDay(date1, date2) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    async areGroupStagesOver() {
        const matchs = await this.matchRepository.matchs.find({
            where: { type: domain_3.MatchType.POULE }
        });
        const allMatchesFinished = matchs.every(match => match.etat === domain_3.MatchState.TERMINER);
        return allMatchesFinished;
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const ticket = await this.ticketRepository.tickets.findOne({
                where: { id: id },
                relations: { user: true }
            });
            if (ticket) {
                return await this.ticketRepository.tickets.remove(ticket).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::TicketService.remove');
            return false;
        }
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_1.ITicketRepository,
        domain_2.IUserRepository,
        domain_3.IMatchRepository])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map