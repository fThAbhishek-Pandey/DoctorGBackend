import express from 'express'
import bookAppointment from '.././controllers/appointments/bookingAPI.js';
import authUser from '../middleware/authUser.js';
const appointmentRouter = express.Router();
appointmentRouter.post('/booked',[authUser],bookAppointment);
export default appointmentRouter;