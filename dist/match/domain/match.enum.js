"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.MatchType = exports.MatchState = void 0;
var MatchState;
(function (MatchState) {
    MatchState["A_VENIR"] = "A_VENIR";
    MatchState["EN_COURS"] = "EN_COURS";
    MatchState["TERMINER"] = "TERMINER";
})(MatchState = exports.MatchState || (exports.MatchState = {}));
var MatchType;
(function (MatchType) {
    MatchType["POULE"] = "PHASE DE POULE";
    MatchType["HUITIEME"] = "1/8 FINALE";
    MatchType["QUART"] = "1/4 FINALE";
    MatchType["DEMI"] = "1/2 FINALE";
    MatchType["FINALE"] = "FINALE";
    MatchType["AMICAL"] = "AMICAL";
})(MatchType = exports.MatchType || (exports.MatchType = {}));
var EventType;
(function (EventType) {
    EventType["BUT"] = "BUT";
    EventType["CARTON_JAUNE"] = "CARTON JAUNE";
    EventType["CARTON_ROUGE"] = "CARTON ROUGE";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=match.enum.js.map