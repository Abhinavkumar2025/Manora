import "dotenv/config";

import express from 'express';
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoute.js";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./routes/authRoute.js";
import galleryRoutes from "./routes/galleryRoute.js";
import albumRoutes from "./routes/albumRoute.js";

const app = express();
connectDB();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

app.use(cors({
    origin: process.env.FRONTEND_URL || "*", // Use env var in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/manora", reportRoutes);

app.use("/manora/auth", authRoutes);
app.use("/manora/gallery", galleryRoutes);
app.use("/manora/albums", albumRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})