import express from 'express';
import { validateMyUserRequest, validateMyLoginRequest, validateMySignupRequest } from '../Middlewares/validation';
import { signupValidation, loginValidation } from '../Middlewares/authValidation';
import { sign } from 'jsonwebtoken';
import { signup, login } from '../Controllers/AuthController';
import MyUserController from '../Controllers/MyUserController';
import ensureAuthenticated from '../Middlewares/auth';
const router = express.Router();
router.post('/login',loginValidation, login)
router.post('/signup',signupValidation , signup) ;
 // first validate all the body and then execute signup

router.get("/",ensureAuthenticated, MyUserController.getCurrentUser)
router.put("/",ensureAuthenticated,validateMyUserRequest,MyUserController.updateCurrentUser)
export default router;
