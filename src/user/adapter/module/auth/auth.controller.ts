import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAccoutDTO } from '../../dto';
import { SendOtpDTo, VerifyOtpDTo } from '../../../../otp/adapter/dto';
import { User } from '../../../domain';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: SigninAccoutDTO,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.authService.validateUser(
      loginDto.phone,
      loginDto.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
    return this.authService.refreshTokens(refresh_token);
  }

  @Post('sendOtp')
  async sendOTP(@Body() data: SendOtpDTo) {
    console.log('cdfcxch c v');

    return await this.authService.sendOTP(data);
  }

  // @Post()
  //   @ApiConsumes('multipart/form-data', 'application/json')
  //   @ApiOperation({
  //     summary: 'send otp',
  //   })
  //   // @ApiBody({ type: RegisterAccoutDTO })
  //   // @ApiResponse({ type: DocUserOutputDTO })
  //   async create(
  //     @Body() data: SendOtpDTo,
  //   ): Promise<Poule> {
  //     const poule = await this.pouleService.add(data);
  //     if (poule) return PouleFactory.getPoule(poule);
  // }

  @Post('verifyOtp')
  async verifyOTP(@Body() data: VerifyOtpDTo): Promise<boolean> {
    return await this.authService.verifyOtp(data);
  }
}
