import { CategoryName, MarketType } from "./bet.enum";

export const MARKET_CONFIG: Record<CategoryName, {
  marketType: MarketType;
  requiresMatch: boolean;
  requiresCompetition: boolean;
}> = {
  [CategoryName.MATCH_RESULT]: {
    marketType: MarketType.ONE_X_TWO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.FIRST_HALF_RESULT]: {
    marketType: MarketType.ONE_X_TWO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.SECOND_HALF_RESULT]: {
    marketType: MarketType.ONE_X_TWO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.BOTH_TEAMS_SCORE]: {
    marketType: MarketType.YES_NO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.YELLOW_CARD]: {
    marketType: MarketType.YES_NO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.RED_CARD]: {
    marketType: MarketType.YES_NO,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.MATCH_GOAL_SCORER]: {
    marketType: MarketType.PLAYERS,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.MATCH_TEAM_QUALIFY]: {
    marketType: MarketType.TEAMS,
    requiresMatch: true,
    requiresCompetition: false
  },

  [CategoryName.COMPETITION_WINNER]: {
    marketType: MarketType.TEAMS,
    requiresMatch: false,
    requiresCompetition: true
  },

  [CategoryName.COMPETITION_TOP_SCORER]: {
    marketType: MarketType.PLAYERS,
    requiresMatch: false,
    requiresCompetition: true
  },

  [CategoryName.COMPETITION_TOP_ASSIST]: {
    marketType: MarketType.PLAYERS,
    requiresMatch: false,
    requiresCompetition: true
  },
};
