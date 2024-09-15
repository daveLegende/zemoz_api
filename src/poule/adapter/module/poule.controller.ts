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
import { PouleFactory } from '../poule.factory';
import { IPouleController, IPouleService } from 'src/poule/app/module';
import { Poule } from 'src/poule/domain';
import { UpdatePouleDTO } from 'src/poule/adapter/dto';
import { DocPouleOutputDto, PouleAccountDto } from '../dto';
  
  @ApiTags('poules management')
  @Controller('poules')
  export class PouleController implements IPouleController {
    constructor(private readonly pouleService: IPouleService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'poules list',
      description: 'Fetch all poules in the DB',
    })
    // @ApiResponse({ type: [pouleAccountDTO] })
    async all(): Promise<Poule[]> {
      const poules = await this.pouleService.fetchAll();
      return poules?.map((poule) => PouleFactory.getPoule(poule));
    }

  
    @Get('search')
    async search(@Query() param: Poule): Promise<Poule> {
      if (param) {
        return PouleFactory.getPoule(await this.pouleService.search(param));
      }
    }
  
    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
    @ApiOperation({
      summary: 'One poule',
      description: 'Fetch user account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    @ApiResponse({ type: DocPouleOutputDto })
    async show(@Param() { id }: IDParamDTO): Promise<Poule> {
      return PouleFactory.getPoule(await this.pouleService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
  
    @Post()
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create poule',
    })
    // @ApiBody({ type: RegisterAccoutDTO })
    // @ApiResponse({ type: DocUserOutputDTO })
    async create(
      @Body() data: PouleAccountDto,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Poule> {
      const poule = await this.pouleService.add(data);
      if (poule) return PouleFactory.getPoule(poule);
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
    @ApiBody({ type: UpdatePouleDTO })
    @ApiResponse({ type: DocPouleOutputDto })
    async update(
      @Body() data: UpdatePouleDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Poule> {
      return PouleFactory.getPoule(await this.pouleService.edit(data));
    }
  
    @Patch('state/:id')
    // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
    @ApiOperation({ summary: 'Set user account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.pouleService.setState(id);
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
      return this.pouleService.remove(id);
    }
  }
  