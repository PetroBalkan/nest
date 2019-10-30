import { Document } from 'mongoose';

export interface VerificationUserModel extends Document {
    _userId: string;
    token: string;
    createdAt: string;
}
