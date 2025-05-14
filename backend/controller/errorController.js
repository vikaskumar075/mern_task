import { ErrorLog } from '../models/ErrorLog.js';

export const getAllErrors = async (req, res) => {
    const logs = await ErrorLog.find().sort({ timestamp: -1 }).limit(10);
    res.json(logs);
};
