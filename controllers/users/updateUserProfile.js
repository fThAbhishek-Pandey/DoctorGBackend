import UserModel from "../../modles/UserModel.js"
import {v2 as cloudnary} from 'cloudinary'
//  userupdating
const updateUser = async (req, res)=>{
  console.log("i am update user controller function : ",req.body)
try {
    const {
        id,
        name,
        address,
        phone,
        gender,
        dob,
      } = req.body;
      const profileImg = req.file;
      
    console.log("name address phone, gender , dob", name,address,phone,gender,dob)
    console.log ("i am in user login id  : ",id);
      if (
        !name||
        !address||
        !phone||
        !gender||
        !dob
      ) {
        return res.json({success:false, message:"fill complete detail"});
      }
      if(profileImg){
        //  upload image to cloudnary
        const imageUpload = await cloudnary.uploader.upload(profileImg.path,{resource_type:'image'})
        const imgURL= imageUpload.secure_url;
        await UserModel.findByIdAndUpdate(id, {image:imgURL});
     }
    const updateDetails = await UserModel.updateOne({_id:id},{
        $set:{name : name,
        address : address,
        phone : phone,
        gender: gender,
        dob: dob,
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