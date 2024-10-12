// API to verification payment of razorpay
import appointmentModel from '../../modles/appointmentModule.js'
import {razorpayInstace} from './index.js'
const verifyRazorpayment = async (req,res)=>{
       const {razorpay_order_id } = req.body
       console.log("razorpay_order_id : ",razorpay_order_id)
       try {
        const orderInfo= await razorpayInstace.orders.fetch(razorpay_order_id )

        console.log("orderinfo : ",orderInfo)
        if(orderInfo.status=== 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payOnine:true});
            res.json({success:true, message:"Payment Successfull"})
        }
        else {
            res.json({success:false, message:"Payment faild"})
        }
       } catch (error) {
           console.log(error);
           res.json({success:false, message:error.message});
       }

}
export default verifyRazorpayment;