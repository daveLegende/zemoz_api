import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ForgotPassAccountDto } from '../dto';
import { ForgotPassFactory } from '../fgp.factory';
import { IUserRepository } from '../../../user/domain';
import { IForgotPassService } from '../../../forgotpass/app/module';
import { ForgotPass, IForgotPassRepository } from '../../../forgotpass/domain';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ForgotPassService implements IForgotPassService {
  private readonly logger = new Logger();
  constructor(
    private fgpRepository: IForgotPassRepository,
    private userRepository: IUserRepository,
  ) {}

  async fetchAll(): Promise<ForgotPass[]> {
    try {
      return await this.fgpRepository.fgps.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ForgotPassService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<ForgotPass> {
    try {
      const fgp = await this.fgpRepository.fgps.findOneByID(id);
      if (fgp) {
        return fgp;
      }
      throw new NotFoundException('fgp not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ForgotPassService.fetchOne');
      throw error;
    }
  }

  async add(data: ForgotPassAccountDto): Promise<ForgotPass> {
    try {
      let { code, email } = data;

      // Générer un OTP de 6 chiffres
      const codes = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await this.userRepository.users.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new NotFoundException('Aucun utilisateur avec cet email');
      }

      // Vérifier et supprimer les anciennes entrées ForgotPass pour cet email
      const existingForgotPasses = await this.fgpRepository.fgps.find({
        where: { email: email },
      });

      // if (existingForgotPasses) {
      //   await this.fgpRepository.fgps.removeMany(existingForgotPasses);
      //   console.log(`Suppression des anciennes demandes de réinitialisation pour l'email: ${email}`);
      // }

      // Configurer l'envoi d'email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Récupération de mot de passe',
        text: `Voici votre code de réinitialisation de mot de passe : ${codes}`, // Envoyer le code de réinitialisation
      };

      code = codes; // Mettre à jour le code dans les données

      // Envoyer l'email
      transporter.sendMail(
        mailOptions,
        (error: any, info: { response: any }) => {
          if (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
          } else {
            console.log('Email envoyé:', info.response);
          }
        },
      );

      // Créer une nouvelle entrée ForgotPass dans la base de données
      return await this.fgpRepository.fgps.create(
        await ForgotPassFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ForgotPassService.add');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const fgp = await this.fgpRepository.fgps.findOneByID(id);
      if (fgp) {
        return await this.fgpRepository.fgps.remove(fgp).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ForgotPassService.remove');
      return false;
    }
  }

  async verifyCode(data: ForgotPassAccountDto): Promise<boolean> {
    try {
      const { code, email } = data;

      const fgp = await this.fgpRepository.fgps.findOne({
        where: {
          code: code,
          email: email,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!fgp) {
        throw new BadRequestException('Code incorrecte');
      }

      return true;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::ForgotPassService.remove');
    }
  }

  // async changePassword(data: ForgotPassAccountDto): Promise<boolean> {
  //   try {
  //     const { code, email } = data;

  //     const fgp = await this.fgpRepository.fgps.findOne({
  //       where: {
  //         code: code,
  //         email: email,
  //       },
  //       order: {
  //         createdAt: 'DESC',
  //       },
  //     });

  //     if (!fgp) {
  //       throw new BadRequestException("Code incorrecte");
  //     }

  //     return true;
  //   } catch (error) {
  //     this.logger.error(error.message, 'ERROR::ForgotPassService.remove');
  //   }
  // }
}
