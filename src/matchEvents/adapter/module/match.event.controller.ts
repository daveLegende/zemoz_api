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
    ApiOperation,
    ApiBody,
    ApiResponse,
    ApiParam,
    ApiConsumes,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { IDParamDTO } from 'adapter/dto';
  import { BaseConfig } from 'config/base.config';
import { MatchEvent } from 'src/matchEvents/domain';
import { MatchEventDTO, UpdateMatchEventDto } from '../dto';
import { MatchEventFactory } from '../match.events.factory';
import { IMatchEventController, IMatchEventService } from 'src/matchEvents/app/module';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
  
  @ApiTags('matchs management')
  @Controller('matchs_events')
  export class MatchEventController implements IMatchEventController {
    constructor(private readonly eventService: IMatchEventService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'matchs list',
      description: 'Fetch all matchs in the DB',
    })
    // @ApiResponse({ type: [MatchAccountDTO] })
    async all(): Promise<MatchEvent[]> {
      const matchs = await this.eventService.fetchAll();
      console.log(matchs);
      
      return matchs?.map((match) => MatchEventFactory.getMatch(match));
    }

  
    @Get('search')
    async search(@Query() param: MatchEvent): Promise<MatchEvent> {
      if (param) {
      const match = new MatchEvent()
        return MatchEventFactory.getMatch(await this.eventService.search(match));
      }
    }
  
    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
    @ApiOperation({
      summary: 'One match',
      description: 'Fetch match account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    // @ApiResponse({ type: MatchDocOutputDTO })
    async show(@Param() { id }: IDParamDTO): Promise<MatchEvent> {
      return MatchEventFactory.getMatch(await this.eventService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create match',
    })
    @ApiBody({ type: MatchEventDTO })
    // @ApiResponse({ type: DocArbitreOutputDto })
    async create(
      @Body() data: MatchEventDTO,
    ): Promise<MatchEvent> {
      // data.logo = file?.filename;
      console.log("creation de match");
      
      const match = await this.eventService.add(data);
      if (match) return MatchEventFactory.getMatch(match);
    }
  
    /**
     * @method PATCH
     */@ApiBearerAuth()
    @UseGuards(AdminGuard)
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
    @ApiOperation({ summary: 'Update match account' })
    @ApiBody({ type: UpdateMatchEventDto })
    // @ApiResponse({ type: MatchDocOutputDTO })
    async update(
      @Body() data: UpdateMatchEventDto
    ): Promise<MatchEvent> {
      return MatchEventFactory.getMatch(await this.eventService.edit(data));
    }
  
    @Patch('state/:id')
    // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
    @ApiOperation({ summary: 'Set match account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the match' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.eventService.setState(id);
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
      description: 'ID of the match to delete',
    })
    @ApiResponse({ type: Boolean })
    remove(@Param() { id }: IDParamDTO): Promise<boolean> {
      return this.eventService.remove(id);
    }
  }
  