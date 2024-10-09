import express from 'express'
import resisterUser from '../controllers/users/userResistation.js';
import loginUser from '../controllers/users/userLogin.js';
import loginProfile from '../controllers/users/getUserProfile.js';
import updateUser from '../controllers/users/updateUserProfile.js';
const userRouter = express.Router();
userRouter.post('/register',resisterUser);
userRouter.post('/login',loginUser)
userRouter.get('/get/:id',loginProfile);
userRouter.put('/update/:id',updateUser);
export default userRouter