import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./reviews.service";





const createReview = catchAsync(async(req,res)=>{

    console.log(req.body);
    
    const result = await ReviewServices.createReviewToDB(req.body)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Create Reviews retrive successfully",
        data:result,
    })
})
const getAllReviews = catchAsync(async(req,res)=>{

    const result = await ReviewServices.getAllReviewFromDB()

    if(result.length === 0){
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success:false,
            message: "Reviews not available",
            data:result,
        })
    }

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "All Reviews retrive successfully",
        data:result,
    })
})


export const ReviewsController = {
    getAllReviews,
    createReview
}
