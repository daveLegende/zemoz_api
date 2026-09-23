export enum TournoiRole {
  // Contrôle total sur CE tournoi précis (mais pas sur l'organisation entière)
  ADMIN = 'ADMIN',

  // Gestion opérationnelle courante : créer/éditer matchs, poules, équipes,
  // inscriptions joueurs (TeamPlayer), planning — équivalent à ADMIN sauf
  // suppression du tournoi et gestion des membres/rôles
  MANAGER = 'MANAGER',

  // Saisie des scores et événements en live pendant un match
  // (match.service::updateScore, penalty-scores, tir-aux-buts, matchEvents)
  // -> le rôle que tiendrait un opérateur terrain avec tes capteurs
  SCORE_KEEPER = 'SCORE_KEEPER',

  // Coordination/affectation des arbitres aux matchs de ce tournoi
  // (assignation dans match.service, cohérence arbitre.tournoi)
  ARBITRE_COORDINATOR = 'ARBITRE_COORDINATOR',

  // Scan/validation des billets à l'entrée/sortie (ticket.service::scan)
  BILLETTERIE = 'BILLETTERIE',

  // Validation financière : coupons/paris de ce tournoi, paiements,
  // isPaid sur coupons/tickets (coupon.service::checkCoupons)
  TRESORIER = 'TRESORIER',
}
