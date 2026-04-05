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
import { PrononsticFactory } from '../pronos.factory';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IPrononsticController, IPrononsticService } from '../../app/module';
import { Prononstic } from '../../domain';
import { DocPrononsticOutputDTO } from '../dto/doc.pronos.dto';
import { UserGuard } from '../../../user/adapter/guard/auth.guard';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';

@ApiTags('pronos management')
@ApiBearerAuth()
@UseGuards(UserGuard, AdminGuard)
@Controller('pronos')
export class PrononsticController implements IPrononsticController {
  constructor(private readonly pronoService: IPrononsticService) { }

  async all(@Query() options: PaginationOptionsDto): Promise<PaginationResultDto<Prononstic>> {
    const result = await this.pronoService.fetchAll(options);
    
    const mappedItems = result.items?.map((prono) => PrononsticFactory.getPronos(prono));
    
    return new PaginationResultDto(mappedItems, result.total, result.page, result.limit);
  }

  @Get(':id')
  // @HasPermission(AccessEnum.CAN_SHOW_USER)
  @ApiOperation({
    summary: 'One prono',
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
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Create prono',
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
