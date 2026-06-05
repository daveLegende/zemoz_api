import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ResendService {
  private readonly logger = new Logger(ResendService.name);
  private apiKey = process.env.RESEND_API_KEY;
  private from = process.env.RESEND_FROM || 'noreply@petitpoto.pro';

  async sendEmail(to: string, subject: string, html: string) {
    if (!this.apiKey) throw new Error('RESEND_API_KEY not set');
    try {
      const resp = await axios.post(
        'https://api.resend.com/emails',
        {
          from: this.from,
          to,
          subject,
          html,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return resp.data;
    } catch (err) {
      this.logger.error('Resend sendEmail error', err?.response?.data ?? err);
      throw err;
    }
  }
}
