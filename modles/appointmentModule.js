import mongoose from 'mongoose'
const appointmentSchema  = new mongoose.Schema({
         userID :{
            type:String,
            required: true
         },
         docId:{
            type:String,
            required:true
         },
         slotDate :{
            type:String,
            required:true
         },
         slotTime:{
            type:String,
            required:true,
         },
         userData :{
            type: Object,
            required:true
         },
         docData:{
            type:Object,
            required:true
         },
         amount: {
            type:Number,
            required:true
         },
         cancelled:{
            type:Boolean,
            default: false
         },
         payOnine:{
            type:Boolean,
            default:false
         },
         isCompleted:{
            type: Boolean,
            default:false
         }

})
const appointmentModel=  mongoose.model('Appointment', appointmentSchema);


export default appointmentModel ;