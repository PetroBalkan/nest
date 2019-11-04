import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@UseInterceptors(ClassSerializerInterceptor)

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UsersService) {

    }

    @Post()
    public async registerUser(@Body() userDto: UserDto): Promise<HttpStatus> {
        return this.usersService.registerUser(userDto);
    }

    @SerializeOptions({
        excludePrefixes: ['_'],
    })
    @Get(':id')
    public async getById(@Param('id') id: string): Promise<UserDto> {
        return this.usersService.findById(id);
    }

    @Get(':userId/:verificationCode')
    public verifyEmail(
        @Param('userId') userId: string,
        @Param('verificationCode') verificationCode: string,
    ): Promise<HttpStatus> {
        return this.usersService.verifyUserEmail(userId, verificationCode);
    }
}
