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
import { PrononsticFactory } from '../pronos.factory';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IPrononsticController, IPrononsticService } from 'src/prononstic/app/module';
import { Prononstic } from 'src/prononstic/domain';
import { DocPrononsticOutputDTO } from '../dto/doc.pronos.dto';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
  
  @ApiTags('pronos management')
  @ApiBearerAuth()
  @UseGuards(UserGuard, AdminGuard)
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
    // @ApiResponse({ type: [pronoAccountDTO] })
    async all(): Promise<Prononstic[]> {
      const pronos = await this.pronoService.fetchAll();
      return pronos?.map((prono) => PrononsticFactory.getPronos(prono));
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
  