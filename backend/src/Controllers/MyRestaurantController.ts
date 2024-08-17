import { Request, Response } from "express"
import cloudinary from 'cloudinary'
import Restaurant from "../Models/restaurant";
import mongoose from "mongoose";
import { AuthenticatedRequest } from '../types/index';

const getMyRestaurant = async(req: AuthenticatedRequest, res: Response) => {
    try{
        console.log("req.userId:", req.userId); // Log the value for debugging

        const restaurant = await Restaurant.findOne({user: req.userId})
        if(!restaurant){
            return res.status(404).json({ message : "restaurant not found"}) // message logged on network tab
        }
    }catch(error){
        console.log("error", error);
        res.status(500).json({ message: "Error fetching restaurant"}); // this message is logged on network tab
    }
}
const createMyRestaurant = async(req: AuthenticatedRequest, res:Response) => {
    try{
        // user can create only one restaurant per account
        console.log("req.userId:", req.userId); // Log the value for debugging

        const existingRestaurant = await Restaurant.findOne({user: req.userId});
        if(existingRestaurant){
            return res.status(409).json({message: "User restaurant already exists"})
        }
        const image = req.file as Express.Multer.File  // picks image file from request to put in storage
        const base64Image = Buffer.from(image.buffer.toString("base64"));
        const dataURI = `data:${image.mimetype};base64,${base64Image}` // mimetype is image type-> jpeg or png etc
        
        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
        const restaurant = new Restaurant(req.body);
                // body will have the name, menu items, location

        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId) // linking the user to the restaurant
        restaurant.lastUpdated = new Date();
        await restaurant.save();
        res.status(201).send(restaurant)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong in creating the restaurant"});
    }
}
export default{
    createMyRestaurant,getMyRestaurant
}