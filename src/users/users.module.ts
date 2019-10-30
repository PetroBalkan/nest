import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UserController],
})
export class UsersModule {
}
