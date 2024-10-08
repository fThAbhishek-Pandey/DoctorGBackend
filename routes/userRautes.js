import express from 'express'
import resisterUser from '../controllers/users/userResistation.js';
const userRouter = express.Router();
userRouter.post('/register',resisterUser);


export default userRouter