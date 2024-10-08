import UserModel from "../../modles/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//  login user 
const loginUser = async (req, res)=>{
try {
    const {email, password} = req.body
    console.log ("i am in user login : ",email,typeof  password)
    const user = await UserModel.findOne({email});
    console.log("i am user: ",user);
    console.log( "passward ; ",user.password)
    if(!user){
      return  res.json ({success:false, message: "user does not exist, Plz resister"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        console.log ("matched user ");
        const user_token = jwt.sign ({id:user._id},process.env.JWT_SECKRET)
      return  res.json({success:true, user_token});
    }
    else {
      return  res.json({success :false, message:"invalid cridencial" })
    }
} catch (error) {
     console.log (error)
    return res.json ({success:false, message: error.message})
}
}
export default loginUser