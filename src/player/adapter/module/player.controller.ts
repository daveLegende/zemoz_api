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
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';
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
  import { memoryStorage } from 'multer';
  import { Express } from 'express';
  import { IDParamDTO } from '../../../_shared/adapter/dto';
  import { BaseConfig } from '../../../_shared/config/base.config';
  import {
    DocUserOutputDTO,
    RegisterAccoutDTO,
  } from '../../../user/adapter/dto';
import { IPlayerController, IPlayerService } from '../../app/module';
import { Player } from '../../domain';
import { PlayerAccoutDTO, UpdatePlayerDTO } from '../dto';
import { PlayerFactory } from '../player.factory';
import { DocPlayerOutputDTO } from '../dto/doc.player.dto';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
  
  @ApiTags('players management')
  @ApiBearerAuth()
  @Controller('players')
  export class PlayerController implements IPlayerController {
    constructor(private readonly playerService: IPlayerService) {}
  
    async all(@Query() options: PaginationOptionsDto): Promise<PaginationResultDto<Player>> {
      const result = await this.playerService.fetchAll(options);
      
      const mappedItems = result.items?.map((player) => PlayerFactory.getPlayer(player));
      
      return new PaginationResultDto(mappedItems, result.total, result.page, result.limit);
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
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    // @HasPermission(AccessEnum.CAN_CREATE_USER)
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: memoryStorage(), // <= stocke en mémoire pour Cloudinary
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
  
    /**
     * @method PATCH
     */
    
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch()
    // @HasPermission(AccessEnum.CAN_UPDATE_USER)
    @UseInterceptors(
      FileInterceptor('avatar', {
        storage: memoryStorage(), // <= stocke en mémoire pour Cloudinary
        fileFilter: BaseConfig.imageFileFilter,
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
      return PlayerFactory.getPlayer(await this.playerService.edit(data, file));
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
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
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
  