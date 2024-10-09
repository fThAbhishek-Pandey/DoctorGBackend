import express from 'express'
import resisterUser from '../controllers/users/userResistation.js';
import loginUser from '../controllers/users/userLogin.js';
import loginProfile from '../controllers/users/userProfile.js';
const userRouter = express.Router();
userRouter.post('/register',resisterUser);
userRouter.post('/login',loginUser)
userRouter.get('/:id',loginProfile);
export default userRouter