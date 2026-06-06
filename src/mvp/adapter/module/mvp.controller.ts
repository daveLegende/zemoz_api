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
import { UserGuard } from '../../../user/adapter/guard/auth.guard';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';

@ApiTags('Mvps management')
@UseGuards(UserGuard)
@UseGuards(AdminGuard)
@Controller('mvp')
export class MVPController implements IMVPController {
  constructor(private readonly mvpService: MVPService) {}

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
    return MVPFactory.getMvp(await this.mvpService.fetchOne(id));
  }

  @Get()
  @ApiOperation({
    summary: 'All mvps',
    description: 'Fetch all mvps',
  })
  @ApiResponse({ type: [DocMvpOutputDto] })
  async fetchAll(): Promise<MVP[]> {
    return this.mvpService.fetchAll();
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
  async create(@Body() data: MvpAccountDto): Promise<MVP> {
    const mvp = await this.mvpService.add(data);
    if (mvp) return MVPFactory.getMvp(mvp);
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
