import * as mongoose from 'mongoose';

export const VerificationTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 259200 },
});
