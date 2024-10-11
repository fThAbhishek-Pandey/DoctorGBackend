import express from 'express'
import resisterUser from '../controllers/users/userResistation.js';
import loginUser from '../controllers/users/userLogin.js';
import getUserProfile from '../controllers/users/getUserProfile.js';
import updateUser from '../controllers/users/updateUserProfile.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js'
import listAppointment from '../controllers/appointments/AppointmentList.js';
const userRouter = express.Router();
userRouter.post('/register',resisterUser);
userRouter.post('/login',loginUser)
userRouter.get('/profile',[authUser],getUserProfile);
userRouter.put('/profile/edit', [upload.single('image'),authUser],updateUser);
userRouter.get('/appointments',[authUser],listAppointment)
export default userRouter