//  doctor login API
import DoctorModel from "../../../modles/DoctorModle.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const LonginDoctor = async (req,res)=>{
      console.log(" i am doctor login req : ", req.body);
      try {
        const {email, password} = req.body
        console.log("---> ",email, password)
        const doctor= await DoctorModel.findOne({email});
        console.log("doctor love", doctor)
        if(!doctor){
            console.log("Invalid Credencial")
            return res.json({success:false, message:'Invalid Credencial'});
        }
        console.log(doctor.password)
        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
            const doctor_token = jwt.sign({id:doctor._id}, process.env.JWT_SECKRET);
            res.json({success:true, doctor_token});
        }
        else {
            res.json({success:false, message:"invalid credencial"})
        }
      } catch (error) {
        console.log(error)
        res.json({success:false, message:"invalid credencial"})
      }
}
export default LonginDoctor;