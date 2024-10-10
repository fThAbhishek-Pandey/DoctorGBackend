import jwt from 'jsonwebtoken'
//  admin authentication middlewre
const authUser = async (req,res,next)=>{
      try{
            const {user_token} = req.headers;
            console.log("req : ",req.headers);
            if(!user_token){
                return res.json({sucess:false,user_token:`${user_token}`, message:"Web token is Null or undefined"})
            }
            const tokenDecode= jwt.verify(user_token, process.env.JWT_SECKRET)
            console.log ("tokenDecode : ",tokenDecode);
            req.body.id = tokenDecode.id;
            console.log( req.body.id);
            next();
      }
      catch(error){
         console.log(error);
         res.json({sucess: false, message: error.message})
      }
}
export default authUser;