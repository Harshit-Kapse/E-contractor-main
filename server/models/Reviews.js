import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

const Reviews = mongoose.model("Reviews", ReviewSchema);

export default Reviews;