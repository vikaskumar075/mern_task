import express from 'express';
import { getAllErrors } from '../controller/errorController.js';

const router = express.Router();

router.get('/', getAllErrors);

export default router;
