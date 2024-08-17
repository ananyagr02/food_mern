import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

//interface: This keyword is used to define a custom
// TypeScript interface, which is a structure that
// defines the shape of an object, including its 
//properties and their types.

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload | string;
    userId?: string;
}