"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketState = exports.TicketType = exports.TicketDuration = void 0;
var TicketDuration;
(function (TicketDuration) {
    TicketDuration["SIMPLE"] = "SIMPLE";
    TicketDuration["PHASE_POULE"] = "PHASE DE POULE";
    TicketDuration["TOURNOI_COMPLET"] = "TOURNOI COMPLET";
})(TicketDuration = exports.TicketDuration || (exports.TicketDuration = {}));
var TicketType;
(function (TicketType) {
    TicketType["STARNDARD"] = "STARNDARD";
    TicketType["VIP"] = "VIP";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
var TicketState;
(function (TicketState) {
    TicketState["VALIDE"] = "VALIDE";
    TicketState["UTILISER"] = "UTILISER";
    TicketState["SUPPRIMER"] = "SUPPRIMER";
})(TicketState = exports.TicketState || (exports.TicketState = {}));
//# sourceMappingURL=ticket.enum.js.map