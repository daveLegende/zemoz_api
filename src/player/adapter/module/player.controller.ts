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
    ApiQuery,
  } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { IDParamDTO } from 'adapter/dto';
  import { BaseConfig } from 'config/base.config';
  import {
    DocUserOutputDTO,
    RegisterAccoutDTO,
  } from 'user/adapter/dto';
import { IPlayerController, IPlayerService } from 'src/player/app/module';
import { Player } from 'src/player/domain';
import { PlayerAccoutDTO, UpdatePlayerDTO } from '../dto';
import { PlayerFactory } from '../player.factory';
import { DocPlayerOutputDTO } from '../dto/doc.player.dto';
  
  @ApiTags('players management')
  @ApiBearerAuth()
  @Controller('players')
  export class PlayerController implements IPlayerController {
    constructor(private readonly playerService: IPlayerService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
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
  
    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
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
  
    /**
     *
     * @method POST
     */
  
    @Post()
    // @HasPermission(AccessEnum.CAN_CREATE_USER)
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: diskStorage({
          destination: BaseConfig.setFilePath,
          filename: BaseConfig.editFileName,
        }),
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
      data.avatar = file?.filename;
      const player = await this.playerService.add(data);
      if (player) return PlayerFactory.getPlayer(player);
    }
  
    /**
     * @method PATCH
     */
  
    @Patch()
    // @HasPermission(AccessEnum.CAN_UPDATE_USER)
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: diskStorage({
          destination: BaseConfig.setFilePath,
          filename: BaseConfig.editFileName,
        }),
        fileFilter: BaseConfig.fileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({ summary: 'Update user account' })
    @ApiBody({ type: UpdatePlayerDTO })
    @ApiResponse({ type: DocPlayerOutputDTO })
    async update(
      @Body() data: UpdatePlayerDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Player> {
      data.avatar = file?.filename;
      return PlayerFactory.getPlayer(await this.playerService.edit(data));
    }
  
    @Patch('state/:id')
    // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
    @ApiOperation({ summary: 'Set user account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.playerService.setState(id);
    }
  
    /**
     * @method DELETE
     */
    @Delete(':id')
    // @HasPermission(AccessEnum.CAN_DELETE_USER)
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
  