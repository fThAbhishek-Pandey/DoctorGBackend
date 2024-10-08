import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB  from './config/mongoDB.js';
import ConnectCloudinary from './config/cloudnary.js';
import adminRouter from './routes/adminRoute.js';
import doctorsRouter from './routes/doctorsRoutes.js';
// app config
const app = express();
const port = process.env.PORT ||4000
ConnectDB()
ConnectCloudinary();
//  middleware
app.use(cors());
app.use(express.json());

//  APIs endpoints
// console.log("admin router",adminRouter)
app.use('/api/admin',adminRouter);
app.use('/api/doctors',doctorsRouter)
// localhost:4000/api/admin/add-doctor
app.get('/', (req,res)=>{
    res.send('Api is working')
});
app.listen (port, ()=>console.log("server is started",port));
