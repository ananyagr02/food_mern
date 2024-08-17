import UserModel from '../Models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface IUser {
    name: string;
    email: string;
    password: string;
    _id?: string;
}

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password }: { name: string, email: string, password: string } = req.body;
        const user: IUser | null = await UserModel.findOne({ email });

        if (user) {
            res.status(409).json({ message: 'User already exists, you can login', success: false });
            return;
        }

        const usermodel = new UserModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();

        const jwtToken = jwt.sign(
            { email: usermodel.email, _id: usermodel._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "signup successful",
            success: true,
            jwtToken,
            name: usermodel.name,
            userId: usermodel._id

        });
    } catch (err) {
        res.status(500).json({
            message: "error signing up the user",
            success: false
        });
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const user: IUser | null = await UserModel.findOne({ email });

        const errorMsg = 'User authentication failed, email or password is wrong';

        if (!user) {
            res.status(403).json({ message: errorMsg, success: false });
            return;
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            res.status(403).json({ message: errorMsg, success: false });
            return;
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({
            message: "error logging in the user",
            success: false
        });
    }
}

export { signup, login };
