import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { MailSenderService } from '../shared/mail-sender/mail-sender.service';
import { VerificationTokenSchema } from './schemas/verification-token.schema';
import { EmailValidationService } from '../shared/email-validation/email-validation.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }, { name: 'verificationUser', schema: VerificationTokenSchema }])],
    providers: [UsersService, EmailValidationService, MailSenderService],
    exports: [UsersService],
    controllers: [UserController],
})
export class UsersModule {
}
