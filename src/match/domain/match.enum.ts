export enum MatchState {
  A_VENIR = 'A_VENIR',
  EN_COURS = 'EN_COURS',
  TERMINER = 'TERMINER',
}

export enum HalfPauseState {
  FIRST_HALF = 'FIRST_HALF',
  HALF_TIME = 'HALF_TIME',
  SECOND_HALF = 'SECOND_HALF',
}

export enum MatchType {
  POULE = 'PHASE DE POULE',
  HUITIEME = '1/8 FINALE',
  QUART = '1/4 FINALE',
  DEMI = '1/2 FINALE',
  FINALE = 'FINALE',
  AMICAL = 'AMICAL',
}

export enum EventType {
  BUT = 'BUT',
  // PASSED = "PASSED",
  CARTON_JAUNE = 'CARTON JAUNE',
  CARTON_ROUGE = 'CARTON ROUGE',
}
