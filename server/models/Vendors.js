import mongoose from 'mongoose'

const VendorsSchema = new mongoose.Schema({
    vendorInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            stars: { type: Number, required: true },
            count: { type: Number, default: 0 },
        },
    ],

    averageRating: {
        type: Number,
        default: 0
    }
})

const Vendor = mongoose.model("Vendor", VendorsSchema);

export default Vendor;