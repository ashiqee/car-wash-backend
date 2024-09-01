import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentServices } from "./payment.service";


const confirmationController= catchAsync(async (req, res) => {
   
   const {transactionId,status,slotId}= req.query;
    const result = await paymentServices.confirmationService(transactionId as string,status as string ,slotId as string);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment done successfully',
      data: result,
    });
  });

export const paymentController = {
    confirmationController
}