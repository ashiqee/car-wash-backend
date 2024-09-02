import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { User } from "../user/user.model";
import { myBookingsServices } from "./myBooking.services";
import AppError from "../../errors/AppError";




const getUserBookings = catchAsync(async(req,res)=>{

    const user = req.user;
    if (!user || !user.userEmail) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User information is missing.');
      }
    const currentuser = await User.findOne({email:user.userEmail})

    if(!currentuser){
        throw new AppError(httpStatus.NOT_FOUND,'Current user not found')
    }

    const result = await myBookingsServices.getUsersBookingsFromDB(currentuser._id.toString())
  
    
    if(result.length === 0){
        return sendResponse(res,{
             statusCode: httpStatus.NOT_FOUND,
             success:false,
             message: "No Data Found",
             data:[],
         })
     }
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "User bookings retrieved successfully",
        data:result,
    })

})


export const myBookingController = {
    getUserBookings
}