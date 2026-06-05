import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from 'user/app/module/user';

import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { IOtpRepository } from 'src/otp/domain';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResendService } from 'src/email/resend.service';
import { OtpFactory } from 'src/otp/adapter/otp.factory';
import { OtpAccountDto, SendOtpDTo, VerifyOtpDTo } from 'src/otp/adapter/dto';
import { IUserRepository, User } from 'user/domain';

@Injectable()
export class AuthService {
    constructor(
      private usersService: IUserService,
      private userRepository: IUserRepository,
      private otpRepository: IOtpRepository,
        private twilioService: TwilioService,
        private resendService: ResendService,
        private jwtService: JwtService,
    ) {}
    
      // async validateUser(email: string, pass: string): Promise<any> {
      //   const user = await this.usersService.fetchByEmail(email);
      //   if (user && user.password === pass) { 
      //     const { password, ...result } = user;
      //     return result;
      //   }
      //   return null;
      // }

  async validateUser(identifier: string, password: string): Promise<any> {
    console.log('Validating user credentials for identifier:', identifier);
    let user: any = null;

    // Try to find by email first (new method)
    if (identifier.includes('@')) {
      try {
        user = await this.usersService.fetchByEmail(identifier);
      } catch (err) {
        console.log(`User not found by email: ${identifier}`);
      }
    } else {
      // Fallback to phone for backward compatibility
      try {
        user = await this.usersService.fetchByPhone(identifier);
      } catch (err) {
        console.log(`User not found by phone: ${identifier}`);
      }
    }

    if (!user) {
        throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log(`Invalid password for identifier: ${identifier}`);
        throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // async login(user: any) {
  //   const payload = { /*email: user.email, */phone: user.phone, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(user: any): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    // Use email if available, fallback to phone for backward compatibility
    const identifier = user.email || user.phone;
    const payload = { email: user.email, phone: user.phone, sub: user.userId || user.id };
    
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',  // L'access token expire après 15 minutes
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET, // Une clé différente pour le refresh token
      expiresIn: '7d',  // Le refresh token expire après 7 jours
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  }

  // Méthode pour valider le refresh token et générer un nouveau access token
  async refreshTokens(refreshToken: string) {
    try {
      // Valider le refresh token
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      // Si le refresh token est valide, générer un nouveau access token
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, phone: payload.phone },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' } // Générer un nouveau access token
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: payload.sub, phone: payload.phone },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' } // Générer un nouveau refresh token
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  // 
  async sendOTP(data: SendOtpDTo): Promise<any> {
    try {
      const { phone } = data;
      const user = await this.userRepository.users.findOneBy({ phone: phone });
      const existed = await this.otpRepository.otps.findOneBy({ phone });

      if (user)
        throw new ConflictException('Cet utilisateur existe déja');
      if (existed)
        throw new ConflictException('Otp already exist');

      // Générer un OTP de 4 chiffres
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
      const otpExpirationTime = moment().add(5, 'minutes').toDate(); // OTP expire après 5 minutes

      // Envoyer l'OTP via Twilio
      try {
        await this.twilioService.sendOtp(phone, otp);
      } catch (twilioError) {
        throw new Error('Une erreur s\'est produite, veuillez réessayer '+twilioError);
      }

      const datas = new OtpAccountDto();
      datas.code = otp;
      datas.phone = phone;
      datas.isVerified = false;
      datas.expiresAt = otpExpirationTime;
      // Enregistrer l'OTP en base de données
      const otpEntity = await this.otpRepository.otps.create(
        await OtpFactory.create(datas),
      );

      return otpEntity;
    } catch (error) {
      // this.logger.error(error.message, 'ERROR::OtpService.add');
      throw error;
    }
  }

  async verifyOtp(data: VerifyOtpDTo): Promise<boolean> {
    try {
      const { code, phone } = data;
      const otp = await this.otpRepository.otps.findOne({ where: { phone: phone, code: code } });

      if (!code) {
        throw new BadRequestException('Code incorrecte');
      }

      // Vérifier si l'OTP a expiré
      if (otp.expiresAt < new Date() || otp.isVerified) {
        throw new BadRequestException('OTP expiré');
      }

      // Mettre à jour le statut de vérification
      otp.isVerified = true;
      await this.otpRepository.otps.update(otp);

      return true;
    } catch (error) {
      
    }
  }

  // Magic link: envoie un lien de confirmation par email
  async sendMagicLink(data: { email: string }): Promise<any> {
    try {
      const { email } = data;
      const user = await this.usersService.fetchByEmail(email);
      if (!user) throw new NotFoundException("Aucun utilisateur avec cet email");

      const token = this.jwtService.sign(
        { sub: user.id ?? user.userId, email: user.email },
        {
          secret: process.env.EMAIL_TOKEN_SECRET || process.env.JWT_SECRET,
          expiresIn: '24h',
        },
      );

      const frontendUrl = process.env.FRONTEND_URL || 'https://app.petitpoto.pro';
      const link = `${frontendUrl}/auth/verify-email?token=${token}`;

      const html = `<p>Bonjour ${user.firstname || ''},</p>
        <p>Merci de confirmer ton adresse e-mail en cliquant sur le lien ci-dessous :</p>
        <p><a href="${link}">Confirmer mon email</a></p>
        <p>Si tu n'as pas demandé ce mail, ignore-le.</p>`;

      await this.resendService.sendEmail(email, 'Confirme ton adresse email', html);

      return { ok: true };
    } catch (error) {
      throw error;
    }
  }

  // Vérifie le token envoyé via magic link et active le compte
  async verifyMagicLink(token: string): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    try {
      const payload: any = this.jwtService.verify(token, { secret: process.env.EMAIL_TOKEN_SECRET || process.env.JWT_SECRET });
      const userId = payload.sub || payload.userId;
      const user = await this.userRepository.users.findOneByID(userId);
      if (!user) throw new NotFoundException('Utilisateur introuvable');

      user.isActivated = true;
      await this.userRepository.users.update(user);

      // ensure compatibility with login expecting user.userId
      (user as any).userId = user.id;

      return this.login(user as any);
    } catch (err) {
      throw new BadRequestException('Token invalide ou expiré');
    }
  }
}
