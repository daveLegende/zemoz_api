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
import { IDParamDTO } from '../../../_shared/adapter/dto/param.dto';
import { IMVPController } from '../../../mvp/app/module';
import { MVPFactory } from '../mvp.factory';
import { MVP } from '../../../mvp/domain';
import { MVPService } from './mvp.service';
import { DocMvpOutputDto, MvpAccountDto } from '../dto';
import { AccountGuard } from '../../../account/adapter/guard/account.guard';
import { PaginationQueryDTO } from '../../../_shared/adapter/dto';
import { PaginatedResult, mapPaginated } from '../../../_shared/domain/pagination';

@ApiTags('Mvps management')
@ApiBearerAuth()
@UseGuards(AccountGuard)
@Controller('mvp')
export class MVPController implements IMVPController {
  constructor(
    private readonly mvpService: MVPService,

  ) { }

  @Get(':id')
  @ApiOperation({
    summary: 'One mvp',
    description: 'Fetch one mvp by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed mvp',
  })
  @ApiResponse({ type: DocMvpOutputDto })
  async fetchOne(@Param() { id }: IDParamDTO): Promise<MVP> {
    return MVPFactory.getMvp(await this.mvpService.fetchOne(id)) as MVP;
  }

  @Get()
  @ApiOperation({
    summary: 'All mvps',
    description: 'Fetch all mvps',
  })
  @ApiResponse({ type: [DocMvpOutputDto] })
  async fetchAll(@Query() query?: PaginationQueryDTO): Promise<PaginatedResult<MVP>> {
    const mvps = await this.mvpService.fetchAll(query);
    return mapPaginated(mvps, (mvp) => MVPFactory.getMvp(mvp) as MVP);
  }

  @Get('match/:id')
  @ApiOperation({
    summary: 'Mvps by match',
    description: 'Fetch all mvps for a given match',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the match',
  })
  async fetchByMatch(
    @Param() { id }: IDParamDTO,
    @Query() query?: PaginationQueryDTO,
  ): Promise<PaginatedResult<MVP>> {
    const mvps = await this.mvpService.fetchByMatch(id, query);
    return mapPaginated(mvps, (mvp) => MVPFactory.getMvp(mvp) as MVP);
  }

  @Get('tournoi/:id')
  @ApiOperation({
    summary: 'Mvps by tournoi',
    description: 'Fetch all mvps for a given tournament',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the tournament',
  })
  async fetchByTournoi(
    @Param() { id }: IDParamDTO,
    @Query() query?: PaginationQueryDTO,
  ): Promise<PaginatedResult<MVP>> {
    const mvps = await this.mvpService.fetchByTournoi(id, query);
    return mapPaginated(mvps, (mvp) => MVPFactory.getMvp(mvp) as MVP);
  }


  /**
   *
   * @method POST
   */

  @ApiBearerAuth()
  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create vote',
  })
  @ApiBody({ type: MvpAccountDto })
  @ApiResponse({ type: DocMvpOutputDto })
  async create(
    @Body() data: MvpAccountDto,
  ): Promise<MVP> {
    const mvp = await this.mvpService.add(data);
    if (mvp) return MVPFactory.getMvp(mvp) as MVP;
  }

  /**
   * @method DELETE
   */
  @Delete(':id')
  // @HasPermission(AccessEnum.CAN_DELETE_USER)
  @ApiOperation({ summary: 'Remove mvp' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the mvp to delete',
  })
  @ApiResponse({ type: Boolean })
  remove(@Param() { id }: IDParamDTO): Promise<boolean> {
    return this.mvpService.remove(id);
  }
}
