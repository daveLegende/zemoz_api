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
  import { IDParamDTO } from 'adapter/dto';
  import { BaseConfig } from 'config/base.config';
import { UpdateTeamDTO } from 'src/team/adapter/dto';
import { Team } from 'src/team/domain';
import { RegisterAccoutDTO, DocUserOutputDTO } from 'user/adapter/dto';
import { TeamFactory } from '../team.factory';
import { ITeamController, ITeamService } from 'src/team/app/module';
import { TeamAccoutDTO } from '../dto';
import { DocTeamOutputDTO } from '../dto/doc.team.dto';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
  
@ApiTags('teams management')
@Controller('teams')
export class TeamController implements ITeamController {
  constructor(private readonly teamService: ITeamService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Teams list',
    description: 'Fetch all Teams in the DB',
  })
  // @ApiResponse({ type: [TeamAccountDTO] })
  async all(): Promise<Team[]> {
    const teams = await this.teamService.fetchAll();
    return teams?.map((team) => TeamFactory.getTeam(team));
  }


  @Get('search')
  async search(@Query() param: TeamAccoutDTO): Promise<Team> {
    if (param) {
      return TeamFactory.getTeam(await this.teamService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Team',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocTeamOutputDTO })
  async show(@Param() { id }: IDParamDTO): Promise<Team> {
    return TeamFactory.getTeam(await this.teamService.fetchOne(id));
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
    summary: 'Create Team',
  })
  @ApiBody({ type: RegisterAccoutDTO })
  @ApiResponse({ type: DocUserOutputDTO })
  async create(
    @Body() data: TeamAccoutDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Team> {
    data.logo = file?.filename;
    const team = await this.teamService.add(data);
    if (team) return TeamFactory.getTeam(team);
  }

  /**
   * @method PATCH
   */
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch()
  // @HasPermission(AccessEnum.CAN_UPDATE_USER)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update user account' })
  @ApiBody({ type: UpdateTeamDTO })
  @ApiResponse({ type: DocTeamOutputDTO })
  async update(
    @Body() data: UpdateTeamDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Team> {
    data.logo = file?.filename;
    return TeamFactory.getTeam(await this.teamService.edit(data));
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.teamService.setState(id);
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
    return this.teamService.remove(id);
  }
}
