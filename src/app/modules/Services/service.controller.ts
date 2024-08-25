import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Services } from "./service.services";
import {  generateTimeSlots } from "./service.utils";
import { ServicesSlot } from "../serviceSlots/serviceSlots.model";
import AppError from "../../errors/AppError";
import { TServiceSlot } from "../serviceSlots/serviceSlots.interface";



const CreateService = catchAsync(async (req,res)=>{
    const userData=req.body;


    const result =  await Services.createServiceIntoDB(userData);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Service created successfully",
        data:result,
    })
})

const getAllServices = catchAsync(async(req,res)=>{
   
    const result = await Services.getAllServicesFromDB();
    if(!result){
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
        message: "Services retrieved successfully",
        data:result,
    })
})



const getSingleService = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await Services.getSingleServiceFromDB(id);
    if(!result){
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
        message: "Service retrieved successfully",
        data:result,
    })
})

const updateService = catchAsync(async(req,res)=>{
    const {id}=req.params;
    const updateData = req.body;
    const result = await Services.updateServiceIntoDB(id,updateData)
    if(!result){
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
        message: "Service updated successfully",
        data:result,
    })
})


//delete service 
const deleteService = catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result = await Services.deleteServiceFromDB(id);

    if(!result){
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
        message: "Service deleted successfully",
        data:result,
    })
})

//create service slot

const createServiceSlot = catchAsync(async(req,res)=>
{
    const serviceDuration =60;
    const {service,date,startTime,endTime} = req.body;


    // check duplicate time slot 

  const isServiceSlotExists = await ServicesSlot.findOne({
    service,date,
    $or:[
        {
            startTime:{$lte:startTime},
            endTime:{$gt:startTime},
        },
        {
            startTime:{$lt:endTime},
            endTime:{$gte:endTime},
        },
        {
            startTime:{$gte:startTime},
            endTime:{$lte:endTime},
        },
    ]
  })

    
  if(isServiceSlotExists){
      throw new AppError(httpStatus.CONFLICT,"This Time Service slot already exist")
  }

    
    if(!service|| !date || !startTime || !endTime){
        return sendResponse(res,{
            statusCode: httpStatus.BAD_REQUEST,
            success:false,
            message: "Missing required fields",
            data:[],
        })
    }

    const slots:TServiceSlot[] = generateTimeSlots(service,date,startTime,endTime,serviceDuration);

    const result = await Services.createServiceSlotInDB(slots)

    

     sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Slots created successfully",
        data:result,
    })
}
)


export const ServicesController = {
    CreateService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
    createServiceSlot
}