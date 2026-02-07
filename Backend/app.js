import "dotenv/config";

import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoute.js";
import passport from "passport";
import "./config/passport.js"; 

import authRoutes from "./routes/authRoute.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/manora", reportRoutes);

app.use("/manora/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})