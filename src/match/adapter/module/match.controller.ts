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
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
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
import { BaseConfig } from '../../../_shared/config/base.config';
import { IMatchController, IMatchService } from 'src/match/app/module';
import { Match } from 'src/match/domain';
import { MatchFactory } from '../match.factory';
import { MatchAccoutDTO, MatchDocOutputDTO, UpdateMatchDTO, UpdateMatchPenaltyScoreDto, UpdateMatchPenaltyStateDto } from '../dto';
import { DocArbitreOutputDto } from 'src/arbitre/adapter/dto';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
import * as multer from 'multer';

  
  @ApiTags('matchs management')
  @Controller('matchs')
  export class MatchController implements IMatchController {
    constructor(private readonly matchService: IMatchService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'matchs list',
      description: 'Fetch all matchs in the DB',
    })
    // @ApiResponse({ type: [MatchAccountDTO] })
    async all(): Promise<Match[]> {
      const matchs = await this.matchService.fetchAll();
      console.log(matchs);
      
      return matchs?.map((match) => MatchFactory.getMatch(match));
    }

  
    @Get('search')
    async search(@Query() param: Match): Promise<Match> {
      if (param) {
      const match = new Match()
        return MatchFactory.getMatch(await this.matchService.search(match));
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
    @ApiResponse({ type: MatchDocOutputDTO })
    async show(@Param() { id }: IDParamDTO): Promise<Match> {
      return MatchFactory.getMatch(await this.matchService.fetchOne(id));
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
    @ApiBody({ type: MatchAccoutDTO })
    @ApiResponse({ type: DocArbitreOutputDto })
    async create(
      @Body() data: MatchAccoutDTO,
    ): Promise<Match> {
      // data.logo = file?.filename;
      console.log("creation de match");
      
      const match = await this.matchService.add(data);
      if (match) return MatchFactory.getMatch(match);
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
        storage: diskStorage({
          destination: BaseConfig.setFilePath,
          filename: BaseConfig.editFileName,
        }),
        fileFilter: BaseConfig.fileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({ summary: 'Update match account' })
    @ApiBody({ type: UpdateMatchDTO })
    @ApiResponse({ type: MatchDocOutputDTO })
    async update(
      @Body() data: UpdateMatchDTO
    ): Promise<Match> {
      return MatchFactory.getMatch(await this.matchService.edit(data));
    }
    

    @Patch('state/:id')
    // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
    @ApiOperation({ summary: 'Set match account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the match' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.matchService.setState(id);
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
      return this.matchService.remove(id);
    }

  @Patch(':id/penalty-scores')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePenaltyScoresWithParam(
    @Body() data: UpdateMatchPenaltyScoreDto
  ) {
    return await this.matchService.updatePenaltyScores(data);
  }

  @Patch(':id/tir-aux-buts')
  @HttpCode(HttpStatus.OK)
  async activateTirAuxButs(@Body() data: UpdateMatchPenaltyStateDto) {
    return await this.matchService.updateTirAuxButsStatus(data);
  }

  // @Post('upload-logo/:id')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: multer.memoryStorage(),
  //   }),
  // )
  // async uploadLogo(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.matchService.uploadLogo(id, file);
  // }


}
  