import express from 'express'
import { bookingComplete, createBooking, getNewBookings, getTotalBookings, rejectBooking } from '../controllers/bookings.js';
import protect, { authRole } from '../middleware/auth.js';

const router = express.Router();

router.route("/create").post(protect, authRole('customer'), createBooking);
router.route("/newBooking").get(protect, authRole('vendor'), getNewBookings);
router.route("/totalBooking").get(protect, authRole('vendor'), getTotalBookings);
router.route("/rejectBooking").post(protect, authRole('vendor'), rejectBooking);
router.route("/completedBooking").post(protect, authRole('vendor'), bookingComplete);

export default router;