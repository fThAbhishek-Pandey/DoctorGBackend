// API to mark appointmnet  completed
import appointmentModel from "../../../modles/appointmentModule.js";
const appointmentCompleted = async (req,res)=>{
    console.log("i am in appointmentCompleted :")
        try {
            const {docId, appointmentId} = req.body
            console.log(" docId , appointmentId",docId, appointmentId)
            const appointmentData= await appointmentModel.findOne({_id :appointmentId})
            console.log("appointmentData",typeof appointmentData,appointmentData.docId)
            
            if(appointmentData && appointmentData.docId === docId){
                console.log ("i am in ");
                await appointmentModel.findByIdAndUpdate(appointmentData._id,{isCompleted:true})
                return res.json({success:true, message:"Appointment completed"});
            }
            else {
                return res.json({success:false, message:"Marked faild"})
            }
        } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message})
        }
}
export default  appointmentCompleted
