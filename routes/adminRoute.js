import express from 'express'
import addDoctor from '../controllers/adminController.js'
import loginAdmin from '../controllers/loginAdmin.js'
import authAdmin from '../middleware/AuthAdmin.js'
console.log("addDoctor",addDoctor);
import upload from '../middleware/multer.js'
import multer from '../middleware/multer.js';
console.log("multer03: ",multer)
const adminRouter = express.Router();
// console.log('I am admin routes',addDoctor)
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
// console.log("admin router02",adminRouter)
export default adminRouter