import express from 'express';
// import { sync } from '../controller/deviceController.js';
import { get_Devices, sync } from '../controller/deviceController.js';

const router = express.Router();

router.get('/', get_Devices);
router.post('/:deviceId/sync', sync);

export default router;
