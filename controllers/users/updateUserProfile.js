import UserModel from "../../modles/UserModel.js"
//  userupdating
const updateUser = async (req, res)=>{
try {
    const id = req.params['id'];
    const {
        name,
        address,
        phone,
        gender,
        dob,
      } = req.body;
      console.log("name address phone, gender , dob", name,address,phone,gender,dob)
    console.log ("i am in user login : ",id);
      if (
        !name||
        !address||
        !phone||
        !gender||
        !dob
      ) {
        return res.json({success:false, message:"fill complete detail"});
      }
    
    const updateDetails = await UserModel.updateOne({_id:id},{
        $set:{name : name,
        address : address,
        phone : phone,
        gender: gender,
        dob: dob
        }
    });
    const user = await UserModel.findById(id);
    console.log("i am user: ",updateDetails,user);
    return  res.json({success:true ,message: "your Detail update successfully"});
} catch (error) {
     console.log (error)
    return res.json ({success:false, message: error.message})
}
}
export default updateUser