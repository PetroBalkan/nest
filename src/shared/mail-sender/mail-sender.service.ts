import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class MailSenderService {
    private transporter;
    private readonly userName: string;
    private readonly userEmail: string;

    constructor(configService: ConfigService) {
        this.userName = configService.get('SYSTEM_EMAIL_SENDER_NAME');
        this.userEmail = configService.get('SYSTEM_EMAIL');
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.userEmail,
                pass: configService.get('SYSTEM_EMAIL_PASSWORD'),
            },
        });
    }

    public sendEmailToUser(receiverName: string, receiverEmail: string, content: string): Promise<any> {
        return this.transporter.sendMail({
            from: `${this.userName} <${this.userEmail}>`,
            to: receiverEmail,
            subject: 'Greeting ✔',
            text: 'Hello world?',
            html: content,
        });
    }
}
