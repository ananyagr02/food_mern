import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from './Routes/authRouter'
import bodyParser from 'body-parser';
import {v2 as cloudinary} from 'cloudinary';
import myRestaurantRoute from './Routes/MyRestaurantRoute'
const PORT = process.env.PORT || 8000;


const app = express();

require('dotenv').config();
require('./Models/db')
// Load environment variables from .env file
dotenv.config();
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.get("/ping", (req, res) => {
    res.send("PONG");
});
app.use('/api/my/user', authRouter)
app.use("/api/my/restaurant", myRestaurantRoute)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
