/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';
import config from '../config';
import { TerrorMessages } from '../interface/errors';


import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res,next) => {
  //setting default values
  let statusCode =  500;
  let message = 'Something went wrong';



  let errorMessages: TerrorMessages = [
    { path: '', message: 'Something went wrong' },
  ];


  if(err instanceof ZodError){
   const simplifiederror = handleZodError(err)
   statusCode = simplifiederror.statusCode;
   message = simplifiederror.message;
   errorMessages = simplifiederror.errorMessages;
  
  } else if (err?.name === 'ValidationError') {
    
    const simplifiederror = handleValidationError(err)
    statusCode = simplifiederror?.statusCode;
    message = simplifiederror?.message;
    errorMessages = simplifiederror?.errorMessages;
  } else if (err?.name === 'CastError') {

    const simplifiederror = handleCastError(err)  
    statusCode = simplifiederror?.statusCode;
    message = simplifiederror?.message;
    errorMessages = simplifiederror?.errorMessages;
  }else if (err?.code === 11000) {

    const simplifiederror = handleDuplicateError(err)  
    statusCode = simplifiederror?.statusCode;
    message = simplifiederror?.message;
    errorMessages = simplifiederror?.errorMessages;
  
  }else if (err instanceof AppError) {

    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = [{
      path:'',
      message:err?.message,
    }]
  }else if (err instanceof Error) {

    message = err?.message;
    errorMessages = [{
      path:'',
      message:err?.message,
    }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
       stack : config.NODE_ENV === 'development'? err?.stack:null
    
  });
};

export default globalErrorHandler;
