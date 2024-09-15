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
  } from '@nestjs/swagger';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { IDParamDTO } from 'adapter/dto';
  import { BaseConfig } from 'config/base.config';
import { Team } from 'src/team/domain';
import { PrononsticFactory } from '../pronos.factory';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IPrononsticController, IPrononsticService } from 'src/prononstic/app/module';
import { Prononstic } from 'src/prononstic/domain';
import { DocPrononsticOutputDTO } from '../dto/doc.pronos.dto';
  
  @ApiTags('pronos management')
  @Controller('pronos')
  export class PrononsticController implements IPrononsticController {
    constructor(private readonly pronoService: IPrononsticService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Prononstics list',
      description: 'Fetch all Prononstics in the DB',
    })
    // @ApiResponse({ type: [TeamAccountDTO] })
    async all(): Promise<Prononstic[]> {
      const teams = await this.pronoService.fetchAll();
      return teams?.map((team) => PrononsticFactory.getPronos(team));
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
    @ApiResponse({ type: DocPrononsticOutputDTO })
    async show(@Param() { id }: IDParamDTO): Promise<Prononstic> {
      return PrononsticFactory.getPronos(await this.pronoService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
  
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
    @ApiResponse({ type: DocPrononsticOutputDTO })
    async create(
      @Body() data: PrononsticAccoutDTO,
    ): Promise<Prononstic> {
      const prono = await this.pronoService.add(data);
      if (prono) return PrononsticFactory.getPronos(prono);
    }
  
    /**
     * @method PATCH
     */
  
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
    @ApiBody({ type: UpdatePrononsticDTO })
    @ApiResponse({ type: DocPrononsticOutputDTO })
    async update(
      @Body() data: UpdatePrononsticDTO,
    ): Promise<Prononstic> {
      return PrononsticFactory.getPronos(await this.pronoService.edit(data));
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
      return this.pronoService.remove(id);
    }
  }
  