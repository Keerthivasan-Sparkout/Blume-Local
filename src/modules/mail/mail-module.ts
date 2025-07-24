import { Inject, Module } from "@nestjs/common";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";
import { MailSenderService } from "./mail-sender.service";

@Module({
    imports: [MailerModule.forRoot({
        transport: {
            host: process.env.SMTP_HOST,
            port: +(process.env.SMTP_PORT ?? 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        },
        defaults: {
            from: `No reply ${process.env.SMTP_USER}`
        },
        template: {
            dir:join(process.cwd(),'src','modules','mail','templates'),
            adapter:new HandlebarsAdapter(),
            options:{strict:true}
        }
    })],
    providers:[MailSenderService],
    exports:[MailSenderService]
})
export class MailModules { }