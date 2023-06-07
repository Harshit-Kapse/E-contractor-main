import mongoose from 'mongoose'

const TotalBookingsSchema = new mongoose.Schema({
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

const TotalBookings = mongoose.model("TotalBookings", TotalBookingsSchema);

export default TotalBookings;