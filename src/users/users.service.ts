import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './models/user.model';
import { BaseUserDto } from './dto/base-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
const ObjectID = Types.ObjectId;

@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(@InjectModel('user') private readonly userModel: Model<User>) {
    }

    public async registerUser(userDto: BaseUserDto): Promise<HttpStatus > {
        try {
            userDto.passwordHash = await this.getHash(userDto.password);
            delete userDto.password;
            await new this.userModel(userDto).save();

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
            console.log(e);
        }
    }

    private async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    private async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
