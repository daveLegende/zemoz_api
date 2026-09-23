import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { Resend } from 'resend';
import { IAccountRepository, Account } from '../../../domain';
import { IOtpRepository } from '../../../../otp/domain';
import { TwilioService } from '../../../../twilio/twilio.service';
import { OtpFactory } from '../../../../otp/adapter/otp.factory';
import { OtpAccountDto, SendOtpDTo, VerifyOtpDTo } from '../../../../otp/adapter/dto';
import { HashFactory } from '../../../../user/adapter/guard/hash.factory';

@Injectable()
export class AuthService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(
    private accountRepository: IAccountRepository,
    private otpRepository: IOtpRepository,
    private twilioService: TwilioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string): Promise<Account> {
    if (!identifier || !password) {
      throw new BadRequestException('Identifier and password are required');
    }

    let account = await this.accountRepository.accounts.findOneBy({ email: identifier });
    if (!account) {
      account = await this.accountRepository.accounts.findOneBy({ phone: identifier });
    }

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    if (!account.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await HashFactory.isRightPwd(password, account.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return account;
  }

  async login(account: Account): Promise<{ accessToken: string; refreshToken: string; account: Account }> {
    const payload = {
      sub: account.id,
      email: account.email,
      phone: account.phone,
      platformRole: account.platformRole,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      account,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email, phone: payload.phone, platformRole: payload.platformRole },
        { secret: process.env.JWT_SECRET, expiresIn: '30d' }
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email, phone: payload.phone, platformRole: payload.platformRole },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async sendOTP(data: SendOtpDTo): Promise<any> {
    const { email, phone } = data;

    if (!email && !phone) {
      throw new BadRequestException('Email or phone is required to send OTP');
    }

    if (email) {
      const account = await this.accountRepository.accounts.findOneBy({ email });
      if (account) {
        throw new ConflictException('Cet utilisateur existe déjà, veuillez vous connecter');
      }

      const existed = await this.otpRepository.otps.findOneBy({ email });
      if (existed) {
        if (existed.expiresAt > new Date()) {
          throw new BadRequestException('Un code a déjà été envoyé. Veuillez attendre 5 minutes avant de réessayer.');
        }
        await this.otpRepository.otps.remove(existed);
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpirationTime = moment().add(5, 'minutes').toDate();

      try {
        const { error } = await this.resend.emails.send({
          from: 'noreply@petitpoto.pro',
          to: email,
          subject: 'Votre code de vérification',
          html: `
            <div style="font-family: sans-serif; max-width: 400px; margin: auto; padding: 24px;">
              <h2 style="color: #047930;">Code de vérification</h2>
              <p>Utilisez ce code pour vous connecter :</p>
              <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #0f2550; margin: 24px 0;">
                ${otp}
              </div>
              <p>Ce code expire dans <strong>5 minutes</strong>.</p>
            </div>
          `,
        });
        if (error) {
          throw new BadRequestException("Impossible d'envoyer l'OTP par email");
        }
      } catch (err) {
        throw new BadRequestException("Impossible d'envoyer l'OTP par email");
      }

      const datas = new OtpAccountDto();
      datas.code = otp;
      datas.email = email;
      datas.isVerified = false;
      datas.expiresAt = otpExpirationTime;

      return await this.otpRepository.otps.create(await OtpFactory.create(datas));
    } else if (phone) {
      const account = await this.accountRepository.accounts.findOneBy({ phone });
      if (account) {
        throw new ConflictException('Cet utilisateur existe déjà, veuillez vous connecter');
      }

      const existed = await this.otpRepository.otps.findOneBy({ phone });
      if (existed) {
        if (existed.expiresAt > new Date()) {
          throw new BadRequestException('Un code a déjà été envoyé. Veuillez ré-essayer plus tard.');
        }
        await this.otpRepository.otps.remove(existed);
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpirationTime = moment().add(5, 'minutes').toDate();

      await this.twilioService.sendOtp(phone, otp);

      const datas = new OtpAccountDto();
      datas.code = otp;
      datas.phone = phone;
      datas.isVerified = false;
      datas.expiresAt = otpExpirationTime;

      return await this.otpRepository.otps.create(await OtpFactory.create(datas));
    }
  }

  async verifyOtp(data: VerifyOtpDTo): Promise<boolean> {
    const { code, email, phone } = data;

    let otp;
    if (email) {
      otp = await this.otpRepository.otps.findOne({ where: { email, code } });
    } else if (phone) {
      otp = await this.otpRepository.otps.findOne({ where: { phone, code } });
    }

    if (!otp) {
      throw new BadRequestException('Code incorrect');
    }

    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('OTP expiré');
    }

    if (otp.isVerified) {
      throw new BadRequestException('OTP déjà utilisé');
    }

    otp.isVerified = true;
    await this.otpRepository.otps.update(otp);

    return true;
  }
}
