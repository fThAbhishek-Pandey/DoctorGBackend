import express from 'express'
import resisterUser from '../controllers/users/userResistation.js';
import loginUser from '../controllers/users/userLogin.js';
import getUserProfile from '../controllers/users/getUserProfile.js';
import updateUser from '../controllers/users/updateUserProfile.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js'
import listAppointment from '../controllers/appointments/AppointmentList.js';
import cancelAppointment from '../controllers/appointments/CancelAppointment.js';
import {paymentRazopay} from '../controllers/paymentGateway/index.js';
import verifyRazorpayment from '../controllers/paymentGateway/paymentverification.js';
const userRouter = express.Router();
userRouter.post('/register',resisterUser);
userRouter.post('/login',loginUser)
userRouter.get('/profile',[authUser],getUserProfile);
userRouter.put('/profile/edit', [upload.single('image'),authUser],updateUser);
userRouter.get('/appointments',[authUser],listAppointment)
userRouter.put('/cancel-appointment', [authUser], cancelAppointment)
userRouter.post('/payment-razorpay',[authUser],paymentRazopay);
userRouter.post('/verifyRazorpay',[authUser],verifyRazorpayment)
export default userRouter