import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAccountDTO } from '../../dto';
import { SendOtpDTo, VerifyOtpDTo } from '../../../../otp/adapter/dto';
import { Account } from '../../../domain';

@Controller('account/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: SigninAccountDTO): Promise<{ accessToken: string; refreshToken: string; account: Account }> {
    const identifier = loginDto.identifier || loginDto.email || loginDto.phone;
    if (!identifier) {
      throw new BadRequestException('Identifier (email or phone) is required');
    }
    const account = await this.authService.validateUser(identifier, loginDto.password);
    return this.authService.login(account);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
    return this.authService.refreshTokens(refresh_token);
  }

  @Post('sendOtp')
  async sendOTP(@Body() data: SendOtpDTo) {
    return await this.authService.sendOTP(data);
  }

  @Post('verifyOtp')
  async verifyOTP(@Body() data: VerifyOtpDTo): Promise<boolean> {
    return await this.authService.verifyOtp(data);
  }
}
