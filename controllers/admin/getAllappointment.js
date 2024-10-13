// Api to get all appointment list
import appointmentModel from "../../modles/appointmentModule.js";
const appointmentAdmin = async (req,res)=> {
     try {
        const appointments = await appointmentModel.find({}).select('-password');
        res.json({success:true,appointments});
     } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
     }
}

export default appointmentAdmin