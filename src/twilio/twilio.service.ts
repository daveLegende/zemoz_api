// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Twilio } from 'twilio';

// @Injectable()
// export class TwilioService {
//   private client: Twilio;
  
//   constructor(private configService: ConfigService) {
//     const accountSid = "ACdb1752f4aeedffd623f65d477d90778c";
//     const authToken = "95a6493555a8c817bfbe0c3d7a210f65";
//     this.client = new Twilio(accountSid, authToken);
//   }

//   async sendOtp(to: string, otp: string): Promise<any> {
//     const from = "+16263250910";
    
//     return this.client.messages.create({
//       body: `Votre code de vérification est: ${otp}`,
//       from,
//       to,
//     })
//     // .then((message) => {
//     //     console.log(message.sid);
//     // })
//     // .catch((error) => {
//     //     console.log(error);;
//     // });
//   }

//   // async validateOtp(phone: string, otp: string): Promise<boolean> {
//   //   // Récupérer l'OTP stocké dans la base de données ou cache
//   //   const storedOtp = await 
  
//   //   // Comparer avec l'OTP reçu
  
//   //   if (storedOtp === otp) {
//   //     console.log('OTP validé avec succès');
//   //     return true;
//   //   } else {
//   //     console.log('OTP invalide');
//   //     return false;
//   //   }
//   // }
// }


// twilio.service.ts
import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  constructor() {
    this.client = Twilio(
      "ACaab292a400368b3d485298278b4e405c",
      "f0986bf192238941bc68cf7935ad3463",
    );
  }

  async sendWhatsAppOtp(phone: string, otp: string): Promise<void> {
    await this.client.messages.create({
      from: `whatsapp:${+14784436649}`,
      to: `whatsapp:${phone}`,
      body: `*Petitpoto.pro* \nVotre code de vérification est: *${otp}*\nExpire dans 5 minutes.`,
    });
  }
}