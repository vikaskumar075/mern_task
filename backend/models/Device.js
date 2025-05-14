import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, required: true, unique: true },
    lastSyncTime: { type: Date, required: true },
    syncStatus: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending',
    },
});

export const Device = mongoose.model('Device', deviceSchema);
