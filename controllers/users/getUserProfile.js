import UserModel from "../../modles/UserModel.js"
//  userFetching 
const getUserProfile = async (req, res)=>{
try {
    console.log ("userProfile",req.body)
    const {id} = req.body;
    console.log ("i am in user login : ",id);
    const user = await UserModel.findById(id).select('-password');
    console.log("i am user: ",user);
    if(!user){
      return  res.json ({success:false, message: "user does not exist, Plz resister"});
    }
    return  res.json({success:true ,user});
} catch (error) {
     console.log (error)
    return res.json ({success:false, message: error.message})
}
}
export default getUserProfile