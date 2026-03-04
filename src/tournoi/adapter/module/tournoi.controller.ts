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
  import { Express } from 'express';
  import { IDParamDTO } from '../../../_shared/adapter/dto';
  import { BaseConfig } from '../../../_shared/config/base.config';
import { UpdateTournoiDTO } from 'src/tournoi/adapter/dto';
import { Tournoi } from 'src/tournoi/domain';
import { RegisterAccoutDTO, DocUserOutputDTO } from 'user/adapter/dto';
import { TournoiFactory } from '../tournoi.factory';
import { ITournoiController, ITournoiService } from 'src/tournoi/app/module';
import { TournoiAccoutDTO } from '../dto';
import { DocTournoiOutputDTO } from '../dto/doc.tournoi.dto';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
  
@ApiTags('Tournois management')
@Controller('tournois')
export class TournoiController implements ITournoiController {
  constructor(private readonly tournoiService: ITournoiService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Tournois list',
    description: 'Fetch all Tournois in the DB',
  })
  // @ApiResponse({ type: [TournoiAccountDTO] })
  async all(): Promise<Tournoi[]> {
    const tournois = await this.tournoiService.fetchAll();
    return tournois?.map((tournoi) => TournoiFactory.getTournoi(tournoi));
  }


  @Get('search')
  async search(@Query() param: TournoiAccoutDTO): Promise<Tournoi> {
    if (param) {
      return TournoiFactory.getTournoi(await this.tournoiService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Tournoi',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocTournoiOutputDTO })
  async show(@Param() { id }: IDParamDTO): Promise<Tournoi> {
    return TournoiFactory.getTournoi(await this.tournoiService.fetchOne(id));
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
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create Tournoi',
  })
  @ApiBody({ type: RegisterAccoutDTO })
  @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: TournoiAccoutDTO,
  ): Promise<Tournoi> {
    const tournoi = await this.tournoiService.add(data);
    if (tournoi) return TournoiFactory.getTournoi(tournoi);
  }

  /**
   * @method PATCH
   */
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch()
  // @HasPermission(AccessEnum.CAN_UPDATE_USER)
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateTournoiDTO })
  @ApiResponse({ type: DocTournoiOutputDTO })
  async update(
    @Body() data: UpdateTournoiDTO,
  ): Promise<Tournoi> {
    return TournoiFactory.getTournoi(await this.tournoiService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.tournoiService.setState(id);
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
    return this.tournoiService.remove(id);
  }
}
