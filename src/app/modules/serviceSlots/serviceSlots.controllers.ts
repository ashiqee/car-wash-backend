import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotsServices } from "./serviceSlots.services";



const getAllServiceSlot = catchAsync(async(req,res)=>{

    const result = await slotsServices.getAllServicesSlotFromDB(req.query)

    if(result.length === 0){
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success:false,
            message: "This services slot not available",
            data:result,
        })
    }

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Available slots retrive successfully",
        data:result,
    })
})



export const ServiceSlotsController = {
    getAllServiceSlot,
}
