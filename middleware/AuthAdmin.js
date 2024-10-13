import jwt from 'jsonwebtoken'
//  admin authentication middlewre
const authAdmin = async (req,res,next)=>{
       console.log("i am admin token : ", req.body)
      try{
            const {admintoken} = req.headers;
            console.log("req : ",req.headers);
            if(!admintoken){
                return res.json({sucess:false,adminToken:`${admintoken}`, message:"Web token is Null or undefined"})
            }
            const tokenDecode= jwt.verify(admintoken, process.env.JWT_SECKRET)
            if( tokenDecode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD ){
                return res.json({sucess:false, message:"Not Authorized Login again"})
            }
            next();
      }
      catch(error){
         console.log(error);
         res.json({sucess: false, message: error.message})
      }
}
export default authAdmin;