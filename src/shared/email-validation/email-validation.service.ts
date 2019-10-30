import { Injectable } from '@nestjs/common';
import { UserDto } from '../../users/dto/user.dto';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerificationUserModel } from '../../users/models/verification-user.model';
import { VerificationTokenDto } from '../../users/dto/verification-token.dto';

@Injectable()
export class EmailValidationService {
    constructor(@InjectModel('verificationUser') private readonly verificationUserModel: Model<VerificationUserModel>,
                private mailSenderService: MailSenderService) {
    }

    public async sendValidationRequest(user: UserDto): Promise<any> {
        const token: VerificationTokenDto = {_userId: user._id, token: '111', createdAt: new Date().toISOString()};
        const content = `<h1>${token.token}</h1>`;

        try {
            await this.mailSenderService.sendEmailToUser(`${user.firstName} ${user.lastName}`, user.email, content);
            this.verificationUserModel(token).save();

        } catch (e) {
            throw e;
        }
    }

    private generateValidationToken(): string {
        return;
    }
}
