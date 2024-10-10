// API for booking appointment
import DoctorModel from "../../modles/DoctorModle.js"
import UserModel from "../../modles/UserModel.js";
import appointmentModel from "../../modles/appointmentModule.js";
const bookAppointment = async (req, res)=> {
    console.log("i am bookappointment ; ", req.body);
        try {
            const {id, docId, slotDate, slotTime}= req.body
            const docData= await DoctorModel.findById(docId).select('-password');
            console.log("doctor ID ", docData);
            if(!docData.available){
                return res.json({success:false, message: "Not Available"});
            }
            let slots_booked = docData.slot_booked;
            // Checking for slot booking
            if(slots_booked[slotDate]){
                if (slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false, message: "Slot Time is Not available"});
                }
                else {
                    slots_booked[slotTime].push(slotTime);
                }
            }
            else {
                slots_booked[slotDate]= []
                slots_booked[slotDate].push(slotTime);
            }
            const userData = await UserModel.findById(id).select('-password');
            delete docData.slot_booked;
            const appointment = {
               userID:id,
               docId,
               userData,
               docData,
               amount: docData.fees,
               slotTime,
               slotDate,
               date : Date.now()
            }
            console.log("appointment data: ",appointment)
            //  appointment is booked
     const newAppointment = new appointmentModel(appointment);
     await newAppointment.save();
            //  save new slot data in doctors data
     await DoctorModel.findByIdAndUpdate(docId, {slots_booked})
     res.json({success:true, message:'Appointment Booked'});

        } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
        }
}
export default bookAppointment;