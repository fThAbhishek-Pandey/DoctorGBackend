import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        name:{
            type:String,
            required :true
        },
        email :{
            type:String,
            required:true,
            unique:true
        },
        image:{
                type:String,
                default:"https://res.cloudinary.com/dvuiubi6u/image/upload/v1728628946/ie6iwov8zorblvgqq32d.png",
        },
        password:{
            type:String,
            default:''
        },
        gender:{
            type:String,
            default: "Not Selected"
        },
        dob:{
            type:String,
            default:"00-00-0000",
        },
        phone:{
            type:String,
            default:"1234567890"
        },
        address:{
            type:String,
            default:"unfilled"
        }
}, {minimize:false})
const UserModel  = mongoose.models.user || mongoose.model('user',UserSchema);
export default UserModel