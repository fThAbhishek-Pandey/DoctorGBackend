// API to cancelled  appointmnet  by doctor 
import appointmentModel from "../../../modles/appointmentModule.js";
const appointmentCancelledByDoctor = async (req,res)=>{
        try {
            const {docId, appointmentId} = req.body
            const appointmentData= await appointmentModel.findOne({_id :appointmentId})
            if(appointmentData && appointmentData.docId === docId){
                await appointmentModel.findByIdAndUpdate(appointmentData._id,{cancelled:true})
                return res.json({success:true, message:"Successfully canceled"});
            }
            else {
                return res.json({success:false, message:"Marked faild"})
            }
        } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message})
        }
}
export default appointmentCancelledByDoctor
