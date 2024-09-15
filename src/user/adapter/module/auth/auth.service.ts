import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SigninAccoutDTO } from 'user/adapter/dto/user.input.dto';
// import { IAuthAPIDataServices } from 'user/app/abstract';
import { IForgotPasswordDTO } from 'user/app/dto/auth.input.dto';
import { IAuthService } from 'user/app/module/auth';
import { User } from 'user/domain';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { IUserService } from 'user/app/module/user';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger();
  constructor(
    private userServices: IUserService,
    private authApiServices: AuthAPIService,
  ) {}

  async signin(
    data: SigninAccoutDTO,
  ): Promise<{ accessToken: string; user: User }> {
    try {
      const user = await this.authApiServices.api.signin(data);
      if (user) {
        if (user) {
          return {
            accessToken: user.accessToken,
            user,
          };
        }
      }
      throw new UnauthorizedException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.signin');
      throw error;
    }
  }

  async forgotPassword(data: IForgotPasswordDTO): Promise<boolean> {
    try {
      const user = await this.userServices.search(data);
      if (user) {
        //
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AuthService.forgotPassword');
      throw error;
    }
  }
}
