import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailSenderService {

  constructor(private mailservice:MailerService){}

  async sendEmail(receiver: string, subject: string,html:string,body:any) {
    // await this.transporter.sendMail({
    //   from: `"Your App" <${process.env.SMTP_USER}>`,
    //   to,
    //   subject,
    //   html,
    // });
    
    await this.mailservice.sendMail({
      from:process.env.SMTP_USER,
      to:receiver,
      subject,
      template:`${html}`,
      context:{
        user:{body}
      }
    })
  }
}
