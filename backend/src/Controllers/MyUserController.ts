import UserModel from '../Models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/index';

const getCurrentUser = async(req: AuthenticatedRequest, res: Response) =>{
    try{
        const currentUser = await UserModel.findOne({_id: req.userId});
        console.log("Authorization header:_______________", req.headers['authorization']);
        console.log("Extracted userId:______________", req.userId);
        console.log(currentUser)
        if(!currentUser){
            return res.status(404).json({message: "User not found"})
        }
        return res.json(currentUser)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"something went wrong"})
    }
}

const updateCurrentUser = async(req: AuthenticatedRequest, res:Response) => {
    try{
        const {name, password,
                phoneNumber, 
                addressLine1, city} = req.body;
                if(!req.body){
                    console.log("Error")
                }
                console.log("req bodyyyyyy", req.body);
        console.log("req.userId: FOR UPDATIONNN", req.userId); // Log the value for debugging

        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        user.name = name;
        user.password = password;
        user.phoneNumber = phoneNumber;
        user.addressLine1 = addressLine1;
        user.city = city;

        await user.save();
        res.send(user);


    } catch(error){                      
        console.log(error)
        res.status(500).json({message: "Error updating user"})
    }
}

export default {getCurrentUser, updateCurrentUser};
