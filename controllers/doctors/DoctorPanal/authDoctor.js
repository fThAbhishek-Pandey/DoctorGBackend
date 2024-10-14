//  Authentication of Doctors
import jwt from 'jsonwebtoken'
const authDoctor =async (req,res, next)=>{
     try {
         const {doctor_token} = req.headers
         console.log ("i am in auth doctor : ", doctor_token)
        if(!doctor_token){
            return  res.json({success:false , message:"you have not autherised"});
         }
        const token_decode = jwt.verify(doctor_token, process.env.JWT_SECKRET)
        req.body.docId= token_decode.id
        console.log("req.body.docId",req.body.docId)
        next()
     } catch (error) {
          console.log(error)
         return  res.json({success:false , message: error.message});
     }
}
export default authDoctor