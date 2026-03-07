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
      from: process.env.EMAIL_USER,
      to: 'davidawayitou5@gmail.com',
      subject: 'Mot de passe de transaction du jour',
      text: `Votre mot de passe de transaction du jour : ${pass}`, // Envoyer le mot de passe en clair
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
  @Cron('7 9 * * * *')
  async scheduleDailyPasswordGeneration() {
    await this.deleteOldPasswords();
    await this.generateAndSendPassword();
  }
}
