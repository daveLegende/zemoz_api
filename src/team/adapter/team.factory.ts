import { ICreateTeamDTO, IUpdateTeamDTO } from "../app/dto";
import { Team } from '../domain'


export abstract class TeamFactory {
  static async create(data: ICreateTeamDTO): Promise<Team> {
    const team = new Team();
    team.name = data.name;
    team.logo = data.logo;
    team.coach = data.coach;
    team.commune = data.commune;
    team.points = data.points;
    team.matchJoues = data.matchJoues;
    team.butMarques = data.butMarques;
    team.butConcedes = data.butConcedes;
    team.joueurs = data.joueurs;
    
    return team;
  }

  static update(team: Team, data: IUpdateTeamDTO): Team {

    team.name = data.name ?? team.name;
    team.logo = data.logo ?? team.logo;
    team.coach = data.coach ?? team.coach;
    team.commune = data.commune ?? team.commune;
    team.points = data.points ?? team.points;
    team.matchJoues = data.matchJoues ?? team.matchJoues;
    team.butMarques = data.butMarques ?? team.butMarques;
    team.butConcedes = data.butConcedes ?? team.butConcedes;
    team.joueurs = data.joueurs ?? team.joueurs;

    return team;
  }

  static getFileLink(file: string): string {
    if (file) {
      return `${process.env.APP_BASE_URL}/files/${file}`;
    }
  }

  static getTeam(team: Team): Team {
    if (team) {
      return {
        id: team.id,
        name: team.name,
        coach: team.coach,
        commune: team.commune,
        points: team.points,
        butMarques: team.butMarques,
        butConcedes: team.butConcedes,
        matchJoues: team.matchJoues,
        joueurs: team.joueurs,
        logo: team.logo,
        poule: team.poule,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        deletedAt: team.deletedAt
      };
    }
  }
}
