// API to make payment of appointment using rozapay
import razorpay from 'razorpay'
import appointmentModel from '../../modles/appointmentModule.js';
const razorpayInstace = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});
const paymentRazopay = async (req,res)=>{

    try {
        const {appointmentId} = req.body
        console.log("appointmentId : ",appointmentId)
        const appointmentData = await appointmentModel.findById(appointmentId);
        console.log("appoints: ",appointmentData)
        if(!appointmentData || appointmentData.cancelled){
             console.log("it is already concelled")
          return res.json({success:false, message:"Appointment Cancelled or Not Found"})
        }
        if(!appointmentData || appointmentData.payOnine){
            console.log("it is already paid")
         return res.json({success:false, message:"Already Paid"})
       }
      //    creating options for rozapay payment 
      const  options = {
          amount : appointmentData.amount*100,
          currency: process.env.CURRENCY,
          receipt:`${appointmentId}`,
      }
       console.log("options : ",options)
      //  creation of an order
       const order = await razorpayInstace.orders.create(options);
       console.log("order : ",order)
       res.json({success:true, order});
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message});
    }   
}
export {paymentRazopay,razorpayInstace};