import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { PasswordEntity } from './entity/pwd.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PasswordService {
    private readonly logger = new Logger(PasswordService.name);
  constructor(
    @InjectRepository(PasswordEntity)
    private passwordRepository: Repository<PasswordEntity>,
  ) {}

  async generateAndSendPassword() {
    // Générer un mot de passe aléatoire
    const pass = crypto.randomBytes(6).toString('hex');
  
    // Hacher le mot de passe avec bcrypt
    const hashedPass = await bcrypt.hash(pass, 10); // 10 est le nombre de salt rounds
  
    // Créer et sauvegarder le mot de passe haché dans la base de données
    const password = new PasswordEntity();
    password.pass = hashedPass; // Stocker le mot de passe haché
    await this.passwordRepository.save(password);
  
    // Configurer l'envoi d'email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'davidawayitou5@gmail.com',
      subject: 'Mot de passe de transaction du jour',
      html: `
        <div style="font-family: Georgia, serif; background-color: #f0faf0; padding: 40px; max-width: 520px; margin: auto; border-radius: 12px; border: 1px solid #a8d5a2;">
          
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; background-color: #2e7d32; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; font-size: 26px; color: #ffffff;">
              🔐
            </div>
          </div>

          <h2 style="color: #1b5e20; text-align: center; font-size: 20px; margin-bottom: 8px;">
            Mot de passe de transaction
          </h2>

          <p style="color: #388e3c; text-align: center; font-size: 13px; margin-bottom: 28px;">
            Valable pour aujourd'hui uniquement
          </p>

          <div style="background-color: #ffffff; border: 2px solid #43a047; border-radius: 10px; padding: 20px; text-align: center;">
            <p style="color: #4caf50; font-size: 12px; letter-spacing: 2px;">
              VOTRE MOT DE PASSE DU JOUR
            </p>

            <p style="color: #1b5e20; font-size: 32px; font-weight: bold; letter-spacing: 6px; font-family: monospace;">
              ${pass}
            </p>
          </div>

          <p style="color: #2e7d32; font-size: 12px; text-align: center; margin-top: 16px;">
            📱 Appuyez longuement sur le mot de passe pour le copier
          </p>

          <p style="color: #81c784; font-size: 11px; text-align: center; margin-top: 12px;">
            Ne partagez pas ce mot de passe. Il est strictement personnel.
          </p>

        </div>
      `,
    };
  
    // Envoyer l'email
    transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
      } else {
        console.log('Email envoyé:', info.response);
      }
    });
  }

  async deleteOldPasswords() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    // Vérifier s'il y a des mots de passe plus anciens qu'hier
    const count = await this.passwordRepository.count({
      where: { createdAt: LessThan(yesterday) },
    });
  
    if (count > 0) {
      // Si des mots de passe existent, on les supprime
      await this.passwordRepository.delete({
        createdAt: LessThan(yesterday),
      });
      console.log('Les anciens mots de passe ont été supprimés.');
    } else {
      console.log('Aucun mot de passe à supprimer.');
    }
  }
  

  // Planification de la tâche quotidienne à 00h30
  // @Cron('0 30 0 * * *')
  // async scheduleDailyPasswordGeneration() {
  //   await this.deleteOldPasswords();
  //   await this.generateAndSendPassword();
  // }
}
