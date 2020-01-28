import express from 'express';
import validateUser from '../middleware/validateUser';
import UserController from '../controller/userController';

const authRouter = express.Router();

authRouter.post('/register', validateUser, UserController.registerAccount);
authRouter.post('/login', UserController.login);

export default authRouter;
