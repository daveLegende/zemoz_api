import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiBody,
    ApiResponse,
    ApiParam,
    ApiConsumes,
  } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { memoryStorage } from 'multer';
  import { Express } from 'express';
  import { IDParamDTO } from '../../../_shared/adapter/dto';
  import { BaseConfig } from '../../../_shared/config/base.config';
  import {
    DocUserOutputDTO,
    RegisterAccoutDTO,
  } from '../../../user/adapter/dto';
import { IPlayerController, IPlayerService } from '../../app/module';
import { Player, TeamPlayer } from '../../domain';
import { PlayerAccoutDTO, TeamPlayerInputDTO, UpdatePlayerDTO, UpdateTeamPlayerDTO } from '../dto';
import { PlayerFactory } from '../player.factory';
import { TeamPlayerFactory } from '../team-player.factory';
import { DocPlayerOutputDTO } from '../dto/doc.player.dto';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
  
  @ApiTags('players management')
  @ApiBearerAuth()
  @Controller('players')
  export class PlayerController implements IPlayerController {
    constructor(private readonly playerService: IPlayerService) {}
  
    @Get()
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'players list',
      description: 'Fetch all players in the DB',
    })
    @ApiResponse({ type: [PlayerAccoutDTO] })
    async all(): Promise<Player[]> {
      const players = await this.playerService.fetchAll();
      return players?.map((player) => PlayerFactory.getPlayer(player));
    }

  
    @Get('search')
    async search(@Query() param: Player): Promise<Player> {
      if (param) {
        return PlayerFactory.getPlayer(await this.playerService.search(param));
      }
    }

    @Get('tournoi/:tournoiId')
    @ApiOperation({
      summary: 'Joueurs d\'un tournoi',
      description: 'Retourne toutes les inscriptions TeamPlayer d\'un tournoi',
    })
    @ApiParam({ type: String, name: 'tournoiId' })
    async byTournoi(@Param('tournoiId') tournoiId: string): Promise<TeamPlayer[]> {
      const inscriptions = await this.playerService.fetchByTournoi(tournoiId);
      return inscriptions?.map((inscription) => TeamPlayerFactory.getTeamPlayer(inscription));
    }
  
    @Get(':id')
    @ApiOperation({
      summary: 'One player',
      description: 'Fetch user account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    @ApiResponse({ type: DocPlayerOutputDTO })
    async show(@Param() { id }: IDParamDTO): Promise<Player> {
      return PlayerFactory.getPlayer(await this.playerService.fetchOne(id));
    }

    @Get(':id/history')
    @ApiOperation({
      summary: 'Historique d\'un joueur',
      description: 'Toutes les inscriptions du joueur, tous tournois confondus',
    })
    @ApiParam({ type: String, name: 'id', description: 'ID du joueur' })
    async history(@Param() { id }: IDParamDTO): Promise<TeamPlayer[]> {
      const inscriptions = await this.playerService.fetchPlayerHistory(id);
      return inscriptions?.map((inscription) => TeamPlayerFactory.getTeamPlayer(inscription));
    }
  
    /**
     *
     * @method POST
     */
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: memoryStorage(),
        fileFilter: BaseConfig.imageFileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create player',
    })
    @ApiBody({ type: RegisterAccoutDTO })
    @ApiResponse({ type: DocUserOutputDTO })
    async create(
      @Body() data: PlayerAccoutDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Player> {
      const player = await this.playerService.add(data, file);
      if (player) return PlayerFactory.getPlayer(player);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post(':id/inscriptions')
    @ApiOperation({
      summary: 'Inscrire un joueur existant dans une nouvelle équipe/tournoi',
    })
    @ApiParam({ type: String, name: 'id', description: 'ID du joueur' })
    @ApiBody({ type: TeamPlayerInputDTO })
    async createInscription(
      @Param() { id }: IDParamDTO,
      @Body() data: TeamPlayerInputDTO,
    ): Promise<TeamPlayer> {
      return TeamPlayerFactory.getTeamPlayer(
        await this.playerService.addInscription(id, data),
      );
    }
  
    /**
     * @method PATCH
     */
    
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch()
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: memoryStorage(),
        fileFilter: BaseConfig.imageFileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({ summary: 'Update player identity (name/age/phone/avatar)' })
    @ApiBody({ type: UpdatePlayerDTO })
    @ApiResponse({ type: DocPlayerOutputDTO })
    async update(
      @Body() data: UpdatePlayerDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Player> {
      return PlayerFactory.getPlayer(await this.playerService.editPlayer(data, file));
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch('inscriptions')
    @ApiOperation({ summary: 'Update une inscription (maillot/poste/statut)' })
    @ApiBody({ type: UpdateTeamPlayerDTO })
    async updateInscription(
      @Body() data: UpdateTeamPlayerDTO,
    ): Promise<TeamPlayer> {
      return TeamPlayerFactory.getTeamPlayer(
        await this.playerService.editInscription(data),
      );
    }
  
    @Patch('state/:id')
    @ApiOperation({ summary: 'Set user account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.playerService.setState(id);
    }
  
    /**
     * @method DELETE
     */
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete('inscriptions/:id')
    @ApiOperation({ summary: 'Supprimer une inscription (ne supprime pas le joueur)' })
    @ApiParam({
      type: String,
      name: 'id',
      description: "ID de l'inscription TeamPlayer",
    })
    @ApiResponse({ type: Boolean })
    removeInscription(@Param() { id }: IDParamDTO): Promise<boolean> {
      return this.playerService.removeInscription(id);
    }

    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Remove Account' })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the user to delete',
    })
    @ApiResponse({ type: Boolean })
    remove(@Param() { id }: IDParamDTO): Promise<boolean> {
      return this.playerService.remove(id);
    }
  }
