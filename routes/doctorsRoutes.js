import express from "express";
import DoctorsList from "../controllers/doctors/DoctorsListConrollers.js";
const doctorsRouter = express.Router()


doctorsRouter.get('/list', DoctorsList)
export default doctorsRouter;