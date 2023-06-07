import Bookings from "../models/Bookings.js";
import TotalBookings from "../models/TotalBookings.js";

export const createBooking = async (req, res) => {
    try {
        const {customer, vendorId, problem} = req.body.ids;
        
        await Bookings.create({
            customer,
            vendor: vendorId,
            request: problem
        });

        res.status(200).json("Booked!");
    } catch (error) {
        res.status(500).json( error.message );
    }
}

export const getNewBookings = async(req, res) => {
    const newBookings = await Bookings.find({ vendor: req.user._id }).populate("customer", "-password").sort("-createdAt");
    
    res.status(200).json(newBookings);
}

export const getTotalBookings = async (req, res) => {
    const totalBookings = await TotalBookings.find({ vendor: req.user._id }).populate("customer", "-password").sort("-createdAt");

    res.status(200).json(totalBookings);
}

export const rejectBooking = async (req, res) => {
    const { bookingId } = req.body;

    await Bookings.deleteOne({ _id: bookingId });

    res.status(200).json("Booking Rejected");
}

export const bookingComplete = async (req, res) => {
    try {
        const { requestId, vendorId } = req.body;

        const completedBooking = await Bookings.findOneAndDelete({ _id: requestId });

        if (!completedBooking) {
            throw new Error(`Booking ID not found in the Database!`);
        }

        const newTotalBooking = new TotalBookings(completedBooking.toObject());
        await newTotalBooking.save();

        const totalBookings = await TotalBookings.find({ vendor: vendorId }).populate("customer", "-password").sort("-createdAt");

        res.status(200).json(totalBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
