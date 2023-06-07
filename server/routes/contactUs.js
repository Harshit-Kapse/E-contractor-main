import express from 'express'
import { getFeedbacks, postFeedbacks } from '../controllers/contactUs.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/feedback').get(getFeedbacks).post(protect, postFeedbacks);

export default router;