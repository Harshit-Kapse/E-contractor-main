import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    request: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Bookings = mongoose.model("Bookings", BookingSchema);

export default Bookings;