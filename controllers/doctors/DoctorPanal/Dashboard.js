//  API to get dashboard data for doctor panel
import appointmentModel from "../../../modles/appointmentModule.js";
const DoctorDashBoard =  async (req, res)=>{
       try {
           const {docId} = req.body;
           const appointmentData= await appointmentModel.find({docId});
           
       let earning =0;
       appointmentData.map((item)=>{
              if(item.isCompleted|| item.payOnine){
                     earning += item.amount;
              }
       })
       let patients = [];
          appointmentData.map((item)=>{
              if(!patients.includes(item.userID)){
                     patients.push(item.userID);
              }
          })
        const dashData = {
              earning,
              appointments : appointmentData.length,
              patients: patients.length,
              latest_appointment : appointmentData.reverse().slice(0,5)
        }
              res.json({success:true,dashData});
        } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
       }
}
export default DoctorDashBoard