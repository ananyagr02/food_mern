import Joi from 'joi';
import { Request, Response, NextFunction } from 'express'; // Import express types

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

export const signupValidation = (req: Request<unknown, unknown, SignupRequestBody>, res: Response, next: NextFunction) => {
    const schema = Joi.object<SignupRequestBody>({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Bad request', error });
    }

    next();
};

export const loginValidation = (req: Request<unknown, unknown, LoginRequestBody>, res: Response, next: NextFunction) => {
    const schema = Joi.object<LoginRequestBody>({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Bad request', error });
    }

    next();
};

// export default {
//     signupValidation,
//     loginValidation
// };
