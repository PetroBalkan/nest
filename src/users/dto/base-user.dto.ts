export class BaseUserDto {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    userPhoto: string;
    email: string;
    passwordHash?: string;
    password: string;
}
