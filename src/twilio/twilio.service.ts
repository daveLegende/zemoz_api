import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID || "ACaab292a400368b3d485298278b4e405c",
      process.env.TWILIO_AUTH_TOKEN || "f0986bf192238941bc68cf7935ad3463",
    );
  }

  async sendWhatsAppOtp(phone: string, otp: string): Promise<void> {
    await this.client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER || `whatsapp:+15559493875`,
      to: `whatsapp:${phone}`,
      body: `*Petitpoto.pro* \nVotre code de vérification est: *${otp}*\nExpire dans 5 minutes.`,
    });
  }

  async sendOtp(phone: string, otp: string): Promise<void> {
    try {
      await this.sendWhatsAppOtp(phone, otp);
    } catch (error) {
      // Fallback SMS
      await this.client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER || '+14784436649',
        to: phone,
        body: `Votre code de vérification est: ${otp}\nExpire dans 5 minutes.`,
      });
    }
  }
}