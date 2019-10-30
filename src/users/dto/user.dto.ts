import { BaseUserDto } from './base-user.dto';
import { Exclude, Transform } from 'class-transformer';

export class UserDto extends BaseUserDto {
    userRole: string;

    @Transform((value) => {
        return value.toString();
    }, { toPlainOnly: true });
    public _id: string;

    @Exclude()
    passwordHash?: string;

    constructor(partial: Partial<UserDto>) {
        super();
        Object.assign(this, partial);
    }
}
