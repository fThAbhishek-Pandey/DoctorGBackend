//  API to cancel appointment

import appointmentModel from "../../modles/appointmentModule.js";
import DoctorModel from "../../modles/DoctorModle.js";

const cancelAppointment = async (req, res)=>{
    console.log("i am cancel Appointent");
    try {
        const {id, appointmentId} = req.body
        // console.log("user_id", id, "appointmentId", appointmentId);
        const appointmentData = await appointmentModel.findById(appointmentId);
        // console.log("appointmentData : ",appointmentData);
        //  verify appointment user
        if(appointmentData.userID !== id ){
            // console.log('unauthorized access');
          return  res.json({success:false, message:'unauthorized access'});

        }
        if(appointmentData.cancelled){
            return  res.json({success:false, message:'Already Canceled'});
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        //  releasing doctor slot 
        const {docId, slotDate, slotTime, } = appointmentData;
        // console.log("appointmentData descruct : ",docId, slotDate, slotTime);
        const doctorData = await DoctorModel.findById(docId);
        // console.log("doctorData : ", doctorData);
        let slots_booked = doctorData.slot_booked;
        // console.log("slots_booked : ",slots_booked)
        slots_booked[slotDate]= slots_booked[slotDate].filter(e => e !== slotTime);
        // console.log("slots_booked 02 : ",slots_booked)
       const updated=  await DoctorModel.findByIdAndUpdate(docId, {slot_booked :slots_booked});
    //    console.log("updated : ", updated);
       res.json({success: true, message: "Appointment Canceled"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
export default cancelAppointment;