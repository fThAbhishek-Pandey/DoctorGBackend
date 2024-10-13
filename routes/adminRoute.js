import express from 'express'
import addDoctor from '../controllers/admin/adminController.js'
// import loginAdmin from '../controllers/admin/loginAdmin.js'
import loginAdmin from '../middleware/loginAdmin.js'
import authAdmin from '../middleware/AuthAdmin.js'
console.log("addDoctor",addDoctor);
import upload from '../middleware/multer.js'
import AllDoctors from '../controllers/doctors/AllDoctors.js';
import changeAvailablity from '../controllers/doctors/doctorController.js';
import appointmentAdmin from '../controllers/admin/getAllappointment.js';
import cancelByAdmin from '../controllers/admin/CancelByAdmin.js';
import adminDashbord from '../controllers/admin/dashboard/dashboardData.js';
// console.log("multer03: ",multer)
const adminRouter = express.Router();
// console.log('I am admin routes',addDoctor)
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/all-doctors',authAdmin,AllDoctors);
adminRouter.post('/change-visibility',authAdmin,changeAvailablity);
adminRouter.get('/appointments',authAdmin, appointmentAdmin)
adminRouter.put('/cancel-appointment',authAdmin, cancelByAdmin)
adminRouter.get('/admin-dashboard',authAdmin, adminDashbord)
// console.log("admin router02",adminRouter)
export default adminRouter;