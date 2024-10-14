//  API to get a doctor appointment for a doctor panal

import appointmentModel from "../../../modles/appointmentModule.js"
const DoctorApopointments = async (req,res) => {
    console.log("you are in DoctorApopointments ");
    try {

        const {docId} = req.body
        console.log( "docId : ", docId)
        const appointment = await appointmentModel.find({docId});
        console.log("appointment : ", appointment);
        res.json({success:true, appointment});
    } catch (error) {
        console.log(error)
        return res.json ({success:false, message:error.message})
    }
}

export default DoctorApopointments