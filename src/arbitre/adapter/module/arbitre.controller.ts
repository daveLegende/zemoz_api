import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
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
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { IDParamDTO } from '../../../_shared/adapter/dto';
import { BaseConfig } from '../../../_shared/config/base.config';
import { IArbitreController, IArbitreService } from '../../app/module';
import { Arbitre } from '../../domain';
import { ArbitreFactory } from '../arbitre.factory';
import {
  ArbitreAccountDto,
  DocArbitreOutputDto,
  UpdateArbitreDTO,
} from '../dto';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
import { memoryStorage } from 'multer';

@ApiTags('Arbitres management')
@UseGuards(AdminGuard)
@ApiBearerAuth()
@Controller('arbitres')
export class ArbitreController implements IArbitreController {
  constructor(private readonly arbitreService: IArbitreService) {}

  @Get()
  // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Arbitres list',
    description: 'Fetch all Arbitres in the DB',
  })
  // @ApiResponse({ type: [ArbitreAccountDTO] })
  async all(): Promise<Arbitre[]> {
    const Arbitres = await this.arbitreService.fetchAll();
    return Arbitres?.map((Arbitre) => ArbitreFactory.getArbitre(Arbitre));
  }

  @Get('search')
  async search(@Query() param: ArbitreAccountDto): Promise<Arbitre> {
    if (param) {
      return ArbitreFactory.getArbitre(await this.arbitreService.search(param));
    }
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One Arbitre',
    description: 'Fetch user account by ID',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'ID of the needed account',
  })
  @ApiResponse({ type: DocArbitreOutputDto })
  async show(@Param() { id }: IDParamDTO): Promise<Arbitre> {
    return ArbitreFactory.getArbitre(await this.arbitreService.fetchOne(id));
  }

  /**
   *
   * @method POST
   */

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(), // <= stocke en mémoire pour Cloudinary
      fileFilter: BaseConfig.imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Create Arbitre' })
  async create(
    @Body() data: ArbitreAccountDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Arbitre> {
    const arbitre = await this.arbitreService.add(data, file); // <= passer le file
    return ArbitreFactory.getArbitre(arbitre);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(), // <= en mémoire
      fileFilter: BaseConfig.fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Update Arbitre' })
  @ApiBody({ type: UpdateArbitreDTO })
  @ApiResponse({ type: DocArbitreOutputDto })
  async update(
    @Body() data: UpdateArbitreDTO,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Arbitre> {
    const arbitre = await this.arbitreService.edit(data, file); // <= passer le file
    return ArbitreFactory.getArbitre(arbitre);
  }

  @Patch('state/:id')
  // @HasPermission(AccessEnum.CAN_SET_USER_STATE)
  @ApiOperation({ summary: 'Set user account state' })
  @ApiParam({ type: String, name: 'id', description: 'ID of the user' })
  @ApiResponse({ type: Boolean })
  async setState(@Param() { id }: IDParamDTO): Promise<boolean> {
    return await this.arbitreService.setState(id);
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
    return this.arbitreService.remove(id);
  }
}
