// API for Appointment list for frontend my appointment page

import appointmentModel from "../../modles/appointmentModule.js";

const listAppointment = async (req,res)=>{
       console.log("listAppointment : ",req.body)
        try {
            const {id} = req.body;
            console.log("user id in listappointment is ", id);
            const appointment = await appointmentModel.find({userID:id});
            console.log("appointment",appointment)
            res.json({success:true, appointment})
        } catch (error) {
            console.log(error);
            res.json ({success:false, message: error.message});
        }
}
export default listAppointment;