import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import adminRoute from "./routes/contactUs.js"
import vendorRoute from "./routes/vendors.js"
import bookingRoute from "./routes/bookings.js"
import mongoose from "mongoose"
mongoose.set('strictQuery', true);

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/user", userRoutes);
app.use("/api/feedbacks", adminRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/bookings", bookingRoute);

const PORT = process.env.PORT || 3009

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}).catch((error) => {
    console.log(`${error} didn't connect`);
});