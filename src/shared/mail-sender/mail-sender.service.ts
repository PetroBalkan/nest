import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailSenderService {
    private transporter;
    private readonly userName = 'Nest Sender';
    private readonly userEmail = 'nest.template2019@gmail.com';
    private readonly userPassword = 'Aaaa111,';

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.userEmail,
                pass: this.userPassword,
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
