import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { BaseUserDto } from './dto/base-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { EmailValidationService } from '../shared/email-validation/email-validation.service';

@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(@InjectModel('user') private readonly userModel: Model<User>,
                private emailValidationService: EmailValidationService) {
    }

    public async registerUser(userDto: BaseUserDto): Promise<HttpStatus> {
        try {
            userDto.passwordHash = await this.getHash(userDto.password);
            delete userDto.password;
            const user = await new this.userModel(userDto).save();
            await this.emailValidationService.sendValidationRequest(user);

            return HttpStatus.OK;
        } catch ({ code, name }) {
            if (name === 'MongoError' && code === 11000) {
                throw new HttpException(`User with email ${userDto.email} already exist!`, HttpStatus.CONFLICT);
            }
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userModel.find(user => user.email === email);
        } catch (e) {
        }
    }

    public async findById(id: string): Promise<UserDto> {
        try {

            const user = await this.userModel.findById(id).lean().exec();
            return new UserDto(user);
        } catch (e) {
        }
    }

    public async verifyUserEmail(userId: string, verificationCode: string): Promise<any> {
        try {
            await this.emailValidationService.verifyUserEmail(userId, verificationCode);
            await this.userModel.findByIdAndUpdate(userId, {isVerified: true});
            return 'Congratulation! You successfully confirmed Your email!';
        } catch (error) {
            return error;
        }
    }

    private async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    private async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
