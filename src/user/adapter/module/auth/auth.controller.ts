import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from 'adapter/decorator';
import {
  SigninAccoutDTO,
  DocSignedUserDTO,
  ForgotPasswordDTO,
} from 'user/adapter/dto';
import { UserFactory } from 'user/adapter/user.factory';
import { SignedUserDTO } from 'user/app/dto';
import { IAuthController, IAuthService } from 'user/app/module/auth';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}

  /**
   * @method POST
   */

  @Post('signin')
  @Public()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Connect the user account' })
  @ApiBody({ type: SigninAccoutDTO })
  @ApiResponse({ type: DocSignedUserDTO })
  async signin(@Body() data: SigninAccoutDTO): Promise<SignedUserDTO> {
    const { accessToken, user } = await this.authService.signin(data);
    if (user) return { accessToken, ...UserFactory.getUser(user) };
  }

  @Post('password.forgot')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Forgot password',
    description:
      'If the user lost his password, he can ask to define a new password using from this endpoint',
  })
  @ApiBody({ type: ForgotPasswordDTO })
  @ApiResponse({ type: Boolean })
  forgotPassword(@Body() data: ForgotPasswordDTO): Promise<boolean> {
    return this.authService.forgotPassword(data);
  }
}
