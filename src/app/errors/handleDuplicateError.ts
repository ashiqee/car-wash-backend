
import { TerrorMessages, TGenericErrorResponse } from '../interface/errors';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError  = (err: any) :TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const value = match && match[1] ;

    const errorMessages : TerrorMessages = [
        {
             path: '',
         message: `Duplicate error: ${value} is already exists`}
    ]
    

    const statusCode = 400;

    return {
        statusCode,
        message: "Cast Error[Invalid Id]",
        errorMessages
    }
};

export default handleDuplicateError;