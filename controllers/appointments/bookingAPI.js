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
            console.log("line 15 ",slots_booked);
            // Checking for slot booking
            if(slots_booked[slotDate]){
                console.log("may i busy", )
                if (slots_booked[slotDate].includes(slotTime)){
                    console.log("i am booked at that time")
                    return res.json({success:false, message: "Slot Time is Not available"});
                }
                else {
                    console.log()
                    slots_booked[slotDate].push(slotTime);
                    console.log("welcome : ",slots_booked[slotDate])
                }
            }
            else {
                slots_booked[slotDate]= []
                slots_booked[slotDate].push(slotTime);
                console.log("welcome ji :",slots_booked[slotDate])
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
    const docSlotUpdate =  await DoctorModel.findByIdAndUpdate(docId, {slot_booked: slots_booked})
     console.log("docSlotUpdate",docSlotUpdate);
    res.json({success:true, message:'Appointment Booked'});

        } catch (error) {
            console.log(error)
            res.json({success: false, message:error.message})
        }
}
export default bookAppointment;