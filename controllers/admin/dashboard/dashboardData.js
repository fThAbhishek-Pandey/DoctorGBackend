//  API to get dashboard data for admin panel
import DoctorModel from "../../../modles/DoctorModle.js"
import UserModel from "../../../modles/UserModel.js";
import appointmentModel from "../../../modles/appointmentModule.js";
const adminDashbord = async(req,res)=>{
        try {
            const doctors = await DoctorModel.find({});
            const users = await UserModel.find({});
            const appointment = await appointmentModel.find({});
            const dashData ={
                tot_doctors : doctors.length,
                tot_patient : users.length,
                tot_appointment : appointment.length,
                latest_appointment : appointment.reverse().slice(0,5)
            }
            res.json({success:true, dashData});

        } catch (error) {
           console.log(error) 
           res.json({success:false,message:error.message})
        }
}
export default adminDashbord;