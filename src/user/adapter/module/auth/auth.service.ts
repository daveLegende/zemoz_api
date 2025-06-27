import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from 'user/app/module/user';

import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { IOtpRepository } from 'src/otp/domain';
import { TwilioService } from 'src/twilio/twilio.service';
import { OtpFactory } from 'src/otp/adapter/otp.factory';
import { OtpAccountDto, SendOtpDTo, VerifyOtpDTo } from 'src/otp/adapter/dto';
import { IUserRepository, User } from 'user/domain';
import { UserRegisterDTO } from 'user/adapter/dto';

@Injectable()
export class AuthService {
    constructor(
      private usersService: IUserService,
      private userRepository: IUserRepository,
      private otpRepository: IOtpRepository,
      private twilioService: TwilioService,
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

  async validateUser(phone: string, password: string): Promise<any> {
    console.log('Validating user credentials for:', phone);
    const user = await this.usersService.fetchByPhone(phone);

    if (!user) {
        console.log(`User not found for email: ${phone}`);
        throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
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
    const payload = { /*email: user.email, */phone: user.phone, sub: user.userId };
    
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

  // async register(data: VerifyOtpDTo): Promise<boolean> {
  //   try {
  //     const { code, phone } = data;
  //     const otp = await this.otpRepository.otps.findOne({ where: { phone: phone, code: code } });

  //     if (!code) {
  //       throw new BadRequestException('Code incorrecte');
  //     }

  //     // Vérifier si l'OTP a expiré
  //     if (otp.expiresAt < new Date() || otp.isVerified) {
  //       throw new BadRequestException('OTP expiré');
  //     }

  //     // Mettre à jour le statut de vérification
  //     otp.isVerified = true;
  //     await this.otpRepository.otps.update(otp);

  //     return true;
  //   } catch (error) {
      
  //   }
  // }

  // async register(data: UserRegisterDTO): Promise<boolean> {
  //   try {
  //     const { lastname, firstname, email, phone, password, confirmPass } = data;

  //     // Vérification des champs vides
  //     const requiredFields = [
  //       { name: 'lastname', value: lastname },
  //       { name: 'firstname', value: firstname },
  //       { name: 'email', value: email },
  //       { name: 'phone', value: phone },
  //       { name: 'password', value: password },
  //       { name: 'confirmPass', value: confirmPass },
  //     ];

  //     const emptyFields = requiredFields
  //       .filter(field => !field.value || field.value.trim() === '')
  //       .map(field => field.name);

  //     if (emptyFields.length > 0) {
  //       throw new BadRequestException(
  //         `Les champs suivants sont obligatoires: ${emptyFields.join(', ')}`,
  //       );
  //     }

  //     // Vérification supplémentaire que les mots de passe correspondent
  //     if (password !== confirmPass) {
  //       throw new BadRequestException('Les mots de passe ne correspondent pas');
  //     }
  //     const user = await this.userRepository.users.findOneBy({ phone: phone });

  //     if (user) {
  //       throw new ConflictException('Cet utilisateur existe déja');
  //     }

  //     const newUser = new User();

  //     newUser.firstname = firstname;
  //     newUser.lastname = lastname;
  //     newUser.email = email;
  //     newUser.phone = phone;
  //     newUser.firstname = firstname;
  //     newUser.firstname = firstname;

  //     return true;
  //   } catch (error) {
      
  //   }
  // }
}
