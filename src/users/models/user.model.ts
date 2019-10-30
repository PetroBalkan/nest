import { Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    userRole: string;
    userPhoto: string;
    userId: string;
    email: string;
    password: string;
}
