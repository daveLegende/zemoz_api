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
  import { memoryStorage } from 'multer';
  import { Express } from 'express';
  import { IDParamDTO } from '../../../_shared/adapter/dto';
  import { BaseConfig } from '../../../_shared/config/base.config';
import { IInfoController, IInfoService } from '../../../infos/app/module';
import { InfoFactory } from '../info.factory';
import { Info } from '../../../infos/domain';
import { DocInfoOutputDto, InfoAccountDto, UpdateInfoDTO } from '../dto';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
  
  @ApiTags('infos management')
  @Controller('infos')
  export class InfoController implements IInfoController {
    constructor(private readonly infoService: IInfoService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Infos list',
      description: 'Fetch all Infos in the DB',
    })
    // @ApiResponse({ type: [InfoAccountDTO] })
    async all(): Promise<Info[]> {
      const infos = await this.infoService.fetchAll();
      return infos?.map((info) => InfoFactory.getInfo(info));
    }

    
    @Get('search')
    async search(@Query() param: Info): Promise<Info> {
      if (param) {
        return InfoFactory.getInfo(await this.infoService.search(param));
      }
    }
    
    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
    @ApiOperation({
      summary: 'One Info',
      description: 'Fetch user account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    @ApiResponse({ type: DocInfoOutputDto })
    async show(@Param() { id }: IDParamDTO): Promise<Info> {
      return InfoFactory.getInfo(await this.infoService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
    
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Post()
    // @ApiBearerAuth()
    // @UseGuards(UserGuard)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: memoryStorage(),
        fileFilter: BaseConfig.imageFileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create Info',
    })
    // @ApiBody({ type: RegisterAccoutDTO })
    // @ApiResponse({ type: DocUserOutputDTO })
    async create(
      @Body() data: InfoAccountDto,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Info> {
      const info = await this.infoService.add(data, file);
      if (info) return InfoFactory.getInfo(info);
    }
  
    /**
     * @method PATCH
     */
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Patch()
    // @HasPermission(AccessEnum.CAN_UPDATE_USER)
    @UseInterceptors(
      FileInterceptor('image', {
        storage: memoryStorage(),
        fileFilter: BaseConfig.imageFileFilter,
      }),
    )
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({ summary: 'Update user account' })
    @ApiBody({ type: UpdateInfoDTO })
    @ApiResponse({ type: DocInfoOutputDto })
    async update(
      @Body() data: UpdateInfoDTO,
      @UploadedFile() file: Express.Multer.File,
    ): Promise<Info> {
      return InfoFactory.getInfo(await this.infoService.edit(data, file));
    }
  
    @Patch('state/:id')
    // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
    @ApiOperation({ summary: 'Set user account state' })
    @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
    @ApiResponse({ type: Boolean })
    async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
      return await this.infoService.setState(id);
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
      return this.infoService.remove(id);
    }
  }
  