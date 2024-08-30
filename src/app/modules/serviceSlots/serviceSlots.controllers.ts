import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotsServices } from "./serviceSlots.services";




const getAllServiceSlot = catchAsync(async(req,res)=>{

    const result = await slotsServices.getAllServicesSlotsFromDB()

    if(result.length === 0){
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success:false,
            message: "services slot not available",
            data:result,
        })
    }

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "All Services slots retrive successfully",
        data:result,
    })
})
const getAllAvailableServiceSlot = catchAsync(async(req,res)=>{

    const result = await slotsServices.getAllServicesAvailableSlotFromDB(req.query)

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

//update slots status
const updateSlotStatus = catchAsync(async(req,res)=>{
const {id}=req.params;
const payload = req.body;
    const result = await slotsServices.updateSlotsStatusIntoDB(id,payload)

    if(!result){
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success:false,
            message: "This services slot can not update",
            data:result,
        })
    }

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "slots update successfully",
        data:result,
    })
})



export const ServiceSlotsController = {
    getAllAvailableServiceSlot,
    getAllServiceSlot,
    updateSlotStatus
}
