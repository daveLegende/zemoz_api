import { Team } from '../../team/domain';
import { ICreateTeamPlayerDTO, IUpdateTeamPlayerDTO } from '../app/dto';
import { Player, TeamPlayer } from '../domain';
import { PlayerFactory } from './player.factory';

export abstract class TeamPlayerFactory {
  static create(
    player: Player,
    equipe: Team,
    data?: Partial<ICreateTeamPlayerDTO> & { numeroMaillot?: number; poste?: string; statut?: string },
  ): TeamPlayer {
    const inscription = new TeamPlayer();
    inscription.player = player;
    inscription.team = equipe;
    inscription.numeroMaillot = data?.numeroMaillot;
    inscription.poste = data?.poste;
    inscription.statut = data?.statut ?? 'ACTIF';
    inscription.buts = 0;
    inscription.passes = 0;
    return inscription;
  }

  static update(inscription: TeamPlayer, data: IUpdateTeamPlayerDTO): TeamPlayer {
    inscription.numeroMaillot = data.numeroMaillot ?? inscription.numeroMaillot;
    inscription.poste = data.poste ?? inscription.poste;
    inscription.statut = data.statut ?? inscription.statut;
    return inscription;
  }

  static getTeamPlayer(inscription: TeamPlayer): TeamPlayer {
    if (!inscription) {
      return inscription;
    }
    return {
      id: inscription.id,
      numeroMaillot: inscription.numeroMaillot,
      poste: inscription.poste,
      buts: inscription.buts,
      passes: inscription.passes,
      statut: inscription.statut,
      player: PlayerFactory.getPlayer(inscription.player, false),
      team: inscription.team
        ? {
            id: inscription.team.id,
            name: inscription.team.name,
            coach: inscription.team.coach,
            commune: inscription.team.commune,
            tournoi: inscription.team.tournoi,
            createdAt: inscription.team.createdAt,
            updatedAt: inscription.team.updatedAt,
            deletedAt: inscription.team.deletedAt,
          } as Team
        : inscription.team,
      createdAt: inscription.createdAt,
      updatedAt: inscription.updatedAt,
      deletedAt: inscription.deletedAt,
    };
  }
}
