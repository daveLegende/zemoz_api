import {
  BadRequestException,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { OtpAccountDto, UpdateOtpDTO } from '../dto';
import { IOtpService } from 'src/otp/app/module';
import { IOtpRepository, Otp } from 'src/otp/domain';
import { OtpFactory } from '../otp.factory';
import { TwilioService } from 'src/twilio/twilio.service';
  
  @Injectable()
  export class OtpService implements IOtpService {
    private readonly logger = new Logger();
    constructor(
      private otpRepository: IOtpRepository,
      private twilioService: TwilioService,
    ) {}
  
    async fetchOne(id: string): Promise<Otp> {
      try {
        const otp = await this.otpRepository.otps.findOneByID(id);
        if (otp) {
          return otp;
        }
        throw new NotFoundException('Otp not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::OtpService.fetchOne');
        throw error;
      }
    }
  
    async add(data: OtpAccountDto): Promise<Otp> {
      try {
        const { phone } = data;
        const existed = await this.otpRepository.otps.findOneBy({ phone });
        if (existed)
          throw new ConflictException('Otp already exist');

        // // Générer un OTP de 4 chiffres
        // const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
        // // const otpExpirationTime = moment().add(5, 'minutes').toDate(); // OTP expire après 5 minutes

        // // Envoyer l'OTP via Twilio
        // try {
        //   await this.twilioService.sendOtp(phone, otp);
        // } catch (twilioError) {
        //   this.logger.error(`Failed to send OTP to ${phone}`, 'ERROR::OtpService.add');
        //   throw new Error('Une erreur s\'est produite, veuillez réessayer ');
        // }
        // Enregistrer l'OTP en base de données
        const otpEntity = await this.otpRepository.otps.create(
          await OtpFactory.create(data),
        );

        return otpEntity;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::OtpService.add');
        throw error;
      }
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const Otp = await this.otpRepository.otps.findOneByID(id);
        if (Otp) {
          return await this.otpRepository.otps.remove(Otp).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::OtpService.remove');
        return false;
      }
    }

    async verifyOtp(phone: string, code: string): Promise<boolean> {
  
      const otp = await this.otpRepository.otps.findOne({ where: { phone: phone, code: code } });
  
      if (!code) {
        throw new BadRequestException('Code incorrecte');
      }
  
      // Vérifier si l'OTP a expiré
      if (otp.expiresAt < new Date()) {
        throw new BadRequestException('OTP expiré');
      }
  
      // Mettre à jour le statut de vérification
      otp.isVerified = true;
      await this.otpRepository.otps.update(otp);
  
      return true;
    }
  
  }
  