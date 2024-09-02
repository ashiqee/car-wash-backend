import { ServiceBooking } from "../booking/booking.model";


//get users all booking get user
const getUsersBookingsFromDB = async (userId: string)=>{
   
    

    const result = await ServiceBooking.find({customer: userId})
    .populate('service slot','-__v -createdAt -updatedAt').select('-customer -__v')
  
    
    return result;
}


export const myBookingsServices = {
   
    getUsersBookingsFromDB
}