import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../../app/module/user';

import { HashFactory } from '../../guard/hash.factory';
import * as moment from 'moment';
import { IOtpRepository } from '../../../../otp/domain';
import { TwilioService } from '../../../../twilio/twilio.service';
import { OtpFactory } from '../../../../otp/adapter/otp.factory';
import { OtpAccountDto, SendOtpDTo, VerifyOtpDTo } from '../../../../otp/adapter/dto';
import { IUserRepository, User } from '../../../domain';
import * as Twilio from 'twilio';
import { log } from 'console';
import { Resend } from 'resend';


@Injectable()
export class AuthService {
    private twilioClient: Twilio.Twilio;
    private whatsappFrom: string;
    private smsFrom: string;
    private resend = new Resend(process.env.RESEND_API_KEY);
    constructor(
      private usersService: IUserService,
      private userRepository: IUserRepository,
      private otpRepository: IOtpRepository,
      private twilioService: TwilioService,
      private jwtService: JwtService,
    ) {
      // this.twilioClient = Twilio(
      //   process.env.TWILIO_ACCOUNT_SID,
      //   process.env.TWILIO_AUTH_TOKEN,
      // );

      // this.whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+15559493875';
      // this.smsFrom = process.env.TWILIO_PHONE_NUMBER || '+14784436649';
    }
    
      // async validateUser(email: string, pass: string): Promise<any> {
      //   const user = await this.usersService.fetchByEmail(email);
      //   if (user && user.password === pass) { 
      //     const { password, ...result } = user;
      //     return result;
      //   }
      //   return null;
      // }

  async validateUser(phone: string, password: string): Promise<any> {
    console.log('Validating user credentials for:', phone);
    const user = await this.usersService.fetchByPhone(phone);

    if (!user) {
        console.log(`User not found for email: ${phone}`);
        throw new BadRequestException('User not found');
    }

    const isPasswordValid = await HashFactory.isRightPwd(password, user.password);
    if (!isPasswordValid) {
        console.log(`Invalid password for phone: ${phone}`);
        throw new BadRequestException('Invalid credentials');
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
    const payload = { email: user.email,/*phone: user.phone*/ sub: user.userId };
    
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
  // async sendOTP(data: SendOtpDTo): Promise<any> {
  //   try {
  //     const { phone } = data;
  //     const user = await this.userRepository.users.findOneBy({ phone: phone });
  //     const existed = await this.otpRepository.otps.findOneBy({ phone });

  //     if (user)
  //       throw new ConflictException('Cet utilisateur existe déja, veuillez vous connecter');
  //     if (existed)
  //       throw new ConflictException('Un message OTP a été envoyé');

  //     // Générer un OTP de 4 chiffres
  //     const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
  //     const otpExpirationTime = moment().add(5, 'minutes').toDate(); // OTP expire après 5 minutes

  //     // Envoyer l'OTP via Twilio
  //     try {
  //       await this.twilioService.sendOtp(phone, otp);
  //     } catch (twilioError) {
  //       throw new Error('Une erreur s\'est produite, veuillez réessayer '+twilioError);
  //     }

  //     const datas = new OtpAccountDto();
  //     datas.code = otp;
  //     datas.phone = phone;
  //     datas.isVerified = false;
  //     datas.expiresAt = otpExpirationTime;
  //     // Enregistrer l'OTP en base de données
  //     const otpEntity = await this.otpRepository.otps.create(
  //       await OtpFactory.create(datas),
  //     );

  //     return otpEntity;
  //   } catch (error) {
  //     // this.logger.error(error.message, 'ERROR::OtpService.add');
  //     throw error;
  //   }
  // }

  // async sendOTP(data: { phone: string }): Promise<any> {
  //   try {
  //     const { phone } = data;

  //     // Vérifie si user existe
  //     const user = await this.userRepository.users.findOneBy({ phone });
  //     if (user) {
  //       throw new ConflictException(
  //         'Cet utilisateur existe déjà, veuillez vous connecter',
  //       );
  //     }

  //     // Vérifie OTP existant
  //     const existed = await this.otpRepository.otps.findOneBy({ phone });
  //     if (existed) {
  //       const now = new Date();
  //       if (existed.expiresAt > now) {
  //         throw new BadRequestException(
  //           "Un code a déjà été envoyé. Veuillez attendre 30 minutes avant de réessayer.",
  //         );
  //       }
  //       await this.otpRepository.otps.remove(existed);
  //     }

  //     // Génère OTP 4 chiffres
  //     const otp = Math.floor(1000 + Math.random() * 9000).toString();
  //     const otpExpirationTime = moment().add(30, 'minutes').toDate();

  //     // Message OTP
  //     const message = `Votre code de vérification est: ${otp}\nExpire dans 30 minutes.`;

  //     // Envoi WhatsApp d'abord
  //     let sentViaWhatsApp = false;
  //     try {
  //       await this.twilioClient.messages.create({
  //         from: this.whatsappFrom,
  //         to: `whatsapp:${phone}`,
  //         body: message,
  //       });
  //       console.log(`✅ OTP envoyé via WhatsApp à ${phone}: ${otp}`);
  //       sentViaWhatsApp = true;
  //     } catch (error) {
  //       console.warn(`⚠️ WhatsApp non disponible pour ${phone}, fallback SMS.`, error.message);
  //     }

  //     // Si WhatsApp échoue, envoi SMS
  //     if (!sentViaWhatsApp) {
  //       try {
  //         await this.twilioClient.messages.create({
  //           from: this.smsFrom,
  //           to: phone,
  //           body: message,
  //         });
  //         console.log(`✅ OTP envoyé via SMS à ${phone}: ${otp}`);
  //       } catch (error) {
  //         console.error('❌ Erreur envoi SMS fallback:', error);
  //         throw new BadRequestException('Impossible d’envoyer l’OTP par WhatsApp ni SMS');
  //       }
  //     }

  //     // Sauvegarde OTP en DB
  //     const datas = new OtpAccountDto();
  //     datas.code = otp;
  //     datas.phone = phone;
  //     datas.isVerified = false;
  //     datas.expiresAt = otpExpirationTime;

  //     const otpEntity = await this.otpRepository.otps.create(
  //       await OtpFactory.create(datas),
  //     );

  //     return otpEntity;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async sendOTP(data: { /*phone*/email: string }): Promise<any> {
    try {
      // const { phone } = data;
      const { email } = data;

      // Vérifie si user existe
      const user = await this.userRepository.users.findOneBy({ email });
      if (user) {
        throw new ConflictException(
          'Cet utilisateur existe déjà, veuillez vous connecter',
        );
      }

      // Vérifie OTP existant
      const existed = await this.otpRepository.otps.findOneBy({ email });
      if (existed) {
        const now = new Date();
        if (existed.expiresAt > now) {
          throw new BadRequestException(
            "Un code a déjà été envoyé. Veuillez attendre 5 minutes avant de réessayer.",
          );
        }
        await this.otpRepository.otps.remove(existed);
      }

      // Génère OTP 4 chiffres
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpirationTime = moment().add(5, 'minutes').toDate();

      // Message OTP
      const message = `Votre code de vérification est: ${otp}\nExpire dans 5 minutes.`;

      // Envoi SMS uniquement
      // Logique d'envoie de otp via email noreply
      try {
        // await this.twilioClient.messages.create({
        //   from: this.smsFrom,
        //   to: phone,
        //   body: message,
        // });
        const { data, error } = await this.resend.emails.send({
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
              <p style="color: #999; font-size: 12px;">
                Si vous n'avez pas demandé ce code, ignorez cet email.
              </p>
            </div>
          `,
        });
        if (error) {
          console.error('❌ Resend Error:', error);
          throw new BadRequestException(
            "Impossible d'envoyer l'OTP par email",
          );
        }

        console.log('✅ Email envoyé:', data);
      } catch (error) {
        console.error('❌ Erreur envoi email:', error);
        throw new BadRequestException('Impossible d’envoyer l’OTP par email');
      }

      // Sauvegarde OTP en DB
      const datas = new OtpAccountDto();
      datas.code = otp;
      datas.email = email;
      datas.isVerified = false;
      datas.expiresAt = otpExpirationTime;

      const otpEntity = await this.otpRepository.otps.create(
        await OtpFactory.create(datas),
      );

      return otpEntity;
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(data: VerifyOtpDTo): Promise<boolean> {
    try {
      // change phone by email
      const { code, email } = data;

      const otp = await this.otpRepository.otps.findOne({
        where: { email, code },
      });

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

    } catch (error) {
      throw error;
    }
  }
}
