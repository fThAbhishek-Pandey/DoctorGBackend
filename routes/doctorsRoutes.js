import express from "express";
import DoctorsList from "../controllers/doctors/DoctorsListConrollers.js";
import LonginDoctor from "../controllers/doctors/DoctorPanal/DoctorLogin.js";
import authDoctor from "../controllers/doctors/DoctorPanal/authDoctor.js";
import DoctorApopointments from "../controllers/doctors/DoctorPanal/DoctorApopointments.js";
import appointmentCancelledByDoctor from "../controllers/doctors/DoctorPanal/CancelAppointment.js";
import  appointmentCompleted from '../controllers/doctors/DoctorPanal/fixedAppointmnents.js'
const doctorsRouter = express.Router()


doctorsRouter.get('/list', DoctorsList)
doctorsRouter.post('/login',LonginDoctor);
doctorsRouter.get('/appointments', authDoctor, DoctorApopointments)
doctorsRouter.post('/appointment-complete', authDoctor, appointmentCompleted)
doctorsRouter.post('/appointment-cancel', authDoctor, appointmentCancelledByDoctor)

export default doctorsRouter;