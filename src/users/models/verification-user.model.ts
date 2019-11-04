import { Document } from 'mongoose';

export interface VerificationUserModel extends Document {
    userId: string;
    token: string;
    createdAt: string;
}
