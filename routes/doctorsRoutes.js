import express from "express";
import DoctorsList from "../controllers/doctors/DoctorsListConrollers.js";
import LonginDoctor from "../controllers/doctors/DoctorPanal/DoctorLogin.js";
const doctorsRouter = express.Router()


doctorsRouter.get('/list', DoctorsList)
doctorsRouter.post('/login',LonginDoctor);
export default doctorsRouter;