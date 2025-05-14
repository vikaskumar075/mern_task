import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    errorMessage: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);
