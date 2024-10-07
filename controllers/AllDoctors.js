// Api to get all doctor list for admin panal
import DoctorModel from "../modles/DoctorModle.js";
const AllDoctors= async (req,res) =>{
      console.log("i am called");
    try {
        const doctors = await DoctorModel.find ({}).select('-password');
        console.log("doctors : ", doctors)
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}
export default AllDoctors;