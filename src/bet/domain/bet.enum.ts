export enum BetType {
    SIMPLE = "Simple",
    COMBINE = "Combiné",
    COMPETITION = "Compétition"
}

export enum CategoryName {
    // Résultat du match
    VICTOIRE = "VICTOIRE",

    // Les deux equipes vont marquer
    DEUX_MARQUENT = "LES DEUX EQUIPES MARQUENT",

    // Pari sur un buteur d'un match
    MATCH_GOAL_SCORER = 'BUTEUR DU MATCH',

    // Equipe qui va se qualifier
    MATCH_TEAM_QUALIFY = 'EQUIPE QUI VA SE QUALIFIER',

    // Résultat à la 1ère mi-temps
    FIRST_HALF_TIME_RESULT = 'RESULTAT PREMIERE MI-TEMPS',

    // Résultat à la 2ème mi-temps
    SECOND_HALF_TIME_RESULT = 'RESULTAT SECONDE MI-TEMPS',
    
    // Vainqueur de la compétition
    COMPETITION_WINNER = 'EQUIPE VAINQUEUR DE LA COMPETITION',
    
    // Meilleur buteur de la compétition
    COMPETITION_TOP_SCORER = 'MEILLEUR BUTEUR DE LA COMPETITION',
    
    // Meilleur passeur de la compétition
    COMPETITION_TOP_ASSIST = 'MEILLEUR PASSEUR DE LA COMPETITION',

    
    CARTON_JAUNE = "CARTON JAUNE",
    CARTON_ROUGE = "CARTON ROUGE"
}



// export enum OptionName {
//     V1 = "V1",
//     V2 = "V2",
//     X = "X",
//     OUI = "OUI",
//     NON = "NON",
// }