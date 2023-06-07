import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    img: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    workType: {
        type: String
    },
    shopAddress: {
        type: String
    }
}, { timestamps: true }
);

if (UserSchema.userType === "vendor") {
    UserSchema.add({
        img: {
            type: String,
        }
    });
}

const User = mongoose.model("User", UserSchema);

export default User;