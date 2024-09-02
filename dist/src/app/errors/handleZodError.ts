
import { ZodError, ZodIssue } from 'zod';
import { TerrorMessages, TGenericErrorResponse } from '../interface/errors';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorMessages: TerrorMessages = err.issues.map((issue : ZodIssue) => ({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }));
  
    const statusCode =400;
    return {
      statusCode,
      message:"Zod validtion Error",
      errorMessages
    };  
  };
  

  export default handleZodError;