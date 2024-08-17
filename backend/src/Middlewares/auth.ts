import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/index';

const ensureAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) =>{
    const auth = req.headers['authorization'] ;  // returns jwt from auth header
    if(!auth){
        return res.status(401)
        .json({message: 'Unauthorized, JWT token is required'})
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET as string)
        // IF EVERYTHING IS RIGHT, 
        req.user = decoded;   // now user is able to access all -> expiry the username, email
        if (typeof decoded !== 'string' && decoded._id) {
            req.userId = decoded._id;  // Explicitly assign the user's ID to req.userId if it exists
        }        next(); //since it is a middleware
    }catch(err){
        return res.status(401)
        .json({
        message: 'Unauthorized, JWT token is wrong or expired'
        })
    }
}

export default ensureAuthenticated;