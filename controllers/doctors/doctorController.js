import DoctorModel from "../../modles/DoctorModle.js"

const changeAvailablity = async (req,res)=>{
        try {
            const {docId} = req.body;
            // console.log(docId)
            const docData = await DoctorModel.findById(docId);
            // console.log(docData);
            await DoctorModel.findByIdAndUpdate(docId,{available: !docData.available}) 
            res.json ({success:true, message: 'Availablity Changed'})
        } catch (error) {
            console.log("changeAvailability : ",error);
            res.json({success:false,message:error.message});
        }
}
export default changeAvailablity;