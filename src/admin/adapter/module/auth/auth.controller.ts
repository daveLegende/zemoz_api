import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { AdminAccountDto } from '../../dto';
import { Admin } from '../../../domain';

@Controller('admins')
export class AuthController {
  constructor(private authService: AdminAuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: AdminAccountDto,
  ): Promise<{ accessToken: string; refreshToken: string; admin: Admin }> {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );
    if (!admin) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(admin);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
    return this.authService.refreshTokens(refresh_token);
  }

  @Post('register')
  async register(@Body() data: AdminAccountDto) {
    console.log('register');

    return await this.authService.register(data);
  }

  // @Post()
  //   @ApiConsumes('multipart/form-data', 'application/json')
  //   @ApiOperation({
  //     summary: 'send otp',
  //   })
  //   // @ApiBody({ type: RegisterAccoutDTO })
  //   // @ApiResponse({ type: DocAdminOutputDTO })
  //   async create(
  //     @Body() data: SendOtpDTo,
  //   ): Promise<Poule> {
  //     const poule = await this.pouleService.add(data);
  //     if (poule) return PouleFactory.getPoule(poule);
  // }
}
