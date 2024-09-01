import { initiatePayment } from "../payment/payment.utils";
import { Service } from "../Services/service.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { ServiceBooking } from "./booking.model";


const createServiceBookingIntoDB = async(payload: TBooking)=>{


    const transactionId = `txn-${Date.now()}`;
    const orderData = {...payload,transactionId}
console.log(orderData);


    const createOrder = await ServiceBooking.create(orderData);

if(createOrder){
    try{
        const service =  await Service.findById(orderData.service);
        const user = await User.findById(orderData.customer)
        
    
    const totalPrice = service?.price || 0;
    
    
    
        const paymentData = {
            transactionId,
            totalPrice,
            customerName: user!.name ,
            customerEmail: user!.email,
            customerPhone: user!.phone,
            customerAddress: user!.address
    
        }
    
       
        
        //payment
        const paymentSession = await initiatePayment(paymentData)
    
   
        
        // const populateBooking = await ServiceBooking.findById(createOrder._id)
        // .populate('customer service slot','-role -__v -createdAt -updatedAt').select('-__v');
        return paymentSession;
    
    }catch(err){
        return err;
    }
}

}

// const createBookingWithPayIntoDB = async(payload: TBooking)=>{

//     const {user,bookedServices}=payload;

//     const transactionId = `txn-${Date.now()}`;
//     const orderData = {...payload,transactionId}
// console.log(orderData);

//     const result = await ServiceBooking.create(orderData);

//     const populateBooking = await ServiceBooking.findById(result._id)
//     .populate('customer service slot','-role -__v -createdAt -updatedAt').select('-__v');
//     return populateBooking;

// }

//get all booking admin
const getAllServiceBookingFromDB = async ()=>{
    const result = ServiceBooking.find()
    .populate('customer service slot','-role -__v -createdAt -updatedAt').select('-__v')
    return result;
}

//get users all booking get user
const getUsersBookingsFromDB = async (userId: string)=>{
   
    

    const result = await ServiceBooking.find({customer: userId})
    .populate('service slot','-__v -createdAt -updatedAt').select('-customer -__v')
  
    
    return result;
}

export const serviceBookings = {
    createServiceBookingIntoDB,
    getAllServiceBookingFromDB,
    getUsersBookingsFromDB
}