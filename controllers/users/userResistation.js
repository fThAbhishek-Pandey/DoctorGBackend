import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from '../../modles/UserModel.js';
import jwt from 'jsonwebtoken'
//  API to resister user
const resisterUser = async (req,res)=>{
      try {
          const {name,email,password} = req.body;
          console.log ("I am in resiter function : ", name, email, password);
          if(!name || !password || !email) {
            return res.json ({success: false, message:"Missing Details"});
          }
          if(!validator.isEmail(email)) {
            return res.json ({success: false, message:"emial is not valid ,plz check"});
          }
        //    validating strong password
          if(password.length <8){
            return res.json ({success: false, message:"Enter a straong password"});
          }
        //    hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await  bcrypt.hash(password,salt);
        console.log (hashPassword);
        const userData = {
            name,
            email,
            password: hashPassword,
        }
        const newUser = new UserModel(userData)
        const user = await newUser.save()
        //  _id  create a token 
        const user_token = jwt.sign({id:user._id}, process.env.JWT_SECKRET)
        res.json ({success: true, user_token})
      } catch (error) {
          console.log(error);
          res.json({success:false, message:error.message})
      }
}
export default resisterUser