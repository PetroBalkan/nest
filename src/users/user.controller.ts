import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';


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
    public async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id);
    }
}
