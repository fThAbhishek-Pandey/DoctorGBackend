import express from 'express'
import addDoctor from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import multer from '../middleware/multer.js';
console.log("multer03: ",multer)
const adminRouter = express.Router();
// console.log('I am admin routes',addDoctor)
adminRouter.post('/add-doctor',upload.single('image'),addDoctor);
// console.log("admin router02",adminRouter)
export default adminRouter