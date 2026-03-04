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
  import { IDParamDTO } from 'src/_shared/adapter/dto';
import { IOtpController, IOtpService } from 'src/otp/app/module';
import { OtpFactory } from '../otp.factory';
import { DocOtpOutputDto, OtpAccountDto } from '../dto';
import { Otp } from 'src/otp/domain';
import { OtpService } from './otp.service';
  
  @ApiTags('Otps management')
  @Controller('otp')
  export class OtpController implements IOtpController {
    constructor(
      private readonly otpService: OtpService,

    ) {}

    @Get(':id')
    // @HasPermission(AccessEnum.CAN_SHOW_USER)
    @ApiOperation({
      summary: 'One Otp',
      description: 'Fetch user account by ID',
    })
    @ApiParam({
      type: String,
      name: 'id',
      description: 'ID of the needed account',
    })
    @ApiResponse({ type: DocOtpOutputDto })
    async show(@Param() { id }: IDParamDTO): Promise<Otp> {
      return OtpFactory.getOtp(await this.otpService.fetchOne(id));
    }
  
    /**
     *
     * @method POST
     */
  
    @Post()
    // @ApiBearerAuth()
    // @UseGuards(UserGuard)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create Otp',
    })
    // @ApiBody({ type: RegisterAccoutDTO })
    // @ApiResponse({ type: DocUserOutputDTO })
    async create(
      @Body() data: OtpAccountDto
    ): Promise<Otp> {
      const otp = await this.otpService.add(data);
      if (otp) return OtpFactory.getOtp(otp);
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
      return this.otpService.remove(id);
    }

    // 
    @Post()
    // @ApiBearerAuth()
    // @UseGuards(UserGuard)
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiOperation({
      summary: 'Create Otp',
    })
    @ApiResponse({ type: Boolean })
    async verifyOTP(
      @Body() phone: string,
      @Body() code: string,
    ): Promise<Boolean> {
      return await this.otpService.verifyOtp(phone, code);
    }
  }
  