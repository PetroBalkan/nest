import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../../users/dto/user.dto';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerificationUserModel } from '../../users/models/verification-user.model';
import { VerificationTokenDto } from '../../users/dto/verification-token.dto';
import * as crypto from 'crypto';

@Injectable()
export class EmailValidationService {
    constructor(@InjectModel('verificationUser') private readonly verificationUserModel: Model<VerificationUserModel>,
                private mailSenderService: MailSenderService) {
    }

    public async sendValidationRequest(user: UserDto): Promise<any> {
        const token: VerificationTokenDto = {
            userId: user._id,
            token: this.generateValidationToken(),
            createdAt: new Date().toISOString(),
        };
        const content = `<h1>${token.token}</h1>`;

        try {
            await this.mailSenderService.sendEmailToUser(`${user.firstName} ${user.lastName}`, user.email, content);
            this.verificationUserModel(token).save();

        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    public async verifyUserEmail(userId: string, verificationCode: string): Promise<HttpStatus> {
        const verificationToken: VerificationTokenDto = await this.verificationUserModel.findOne((error, token) => token.userId === userId);
        if (verificationToken && verificationToken.token === verificationCode) {
            return HttpStatus.OK;
        }
        throw new HttpException('Invalid verification', HttpStatus.BAD_REQUEST);
    }

    private generateValidationToken(): string {
        return crypto.randomBytes(24).toString('hex');
    }
}
