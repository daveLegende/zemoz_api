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
import { AdminGuard } from 'src/admin/adapter/guard/auth.guard';
import { IForgotPassController, IForgotPassService } from 'src/forgotpass/app/module';
import { ForgotPass } from 'src/forgotpass/domain';
import { ForgotPassAccountDto } from '../dto';
import { ForgotPassFactory } from '../fgp.factory';
  
  @ApiTags('forgot pass management')
  @Controller('forgotpass')
  export class ForgotPassController implements IForgotPassController {
    constructor(private readonly fgpService: IForgotPassService) {}
  
    @Get()
    // @HasPermission(AccessEnum.CAN_SHOW_USER_LIST)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'ForgotPasss list',
      description: 'Fetch all ForgotPasss in the DB',
    })
    // @ApiResponse({ type: [ForgotPassAccountDTO] })
    async all(): Promise<ForgotPass[]> {
      const fgps = await this.fgpService.fetchAll();
      return fgps?.map((fgp) => ForgotPassFactory.getFgp(fgp));
    }
    
    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
    @ApiOperation({
      summary: 'One ForgotPass',
      description: 'Fetch user account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    async show(@Param() { id }: IDParamDTO): Promise<ForgotPass> {
      return ForgotPassFactory.getFgp(await this.fgpService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
    @Post()
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create ForgotPass',
    })
    async create(
      @Body() data: ForgotPassAccountDto,
    ): Promise<ForgotPass> {
      const fgp = await this.fgpService.add(data);
      if (fgp) return ForgotPassFactory.getFgp(fgp);
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
      return this.fgpService.remove(id);
    }


    /**
     *
     * @method POST
     */
    @Post("verify-code")
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Verify code',
    })
    async verifyCode(
      @Body() data: ForgotPassAccountDto,
    ): Promise<boolean> {
      const fgp = await this.fgpService.verifyCode(data);
      return fgp;
    }
  }
  