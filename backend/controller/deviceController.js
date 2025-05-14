import { Device } from '../models/Device.js';


const ManualSync = async (deviceId) => {
    const updated = await Device.findOneAndUpdate(
        { deviceId },
        {
            lastSyncTime: new Date()

        },
        { new: true }
    );

    return {
        success: !!updated,
        message: updated
            ? `Sync triggered for ${deviceId}`
            : `Device ${deviceId} not found`,
    };
};

export const get_Devices = async (req, res) => {
    const devices = await Device.find();
    res.json(devices);
};

export const sync = async (req, res) => {
    const { deviceId } = req.params;
    const response = await ManualSync(deviceId);
    res.json(response);
};


