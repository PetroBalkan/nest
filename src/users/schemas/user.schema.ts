import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    userRole: { type: String, required: false },
    userPhoto: { type: String, required: false },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    isVerified: { type: Boolean, defaultStrategy: false, index: true },
    createdAt: { type: Date, default: Date.now },
});
UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200, partialFilterExpression: { isVerified: false } });
