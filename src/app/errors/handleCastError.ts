
import  mongoose  from 'mongoose';
import { TerrorMessages, TGenericErrorResponse } from '../interface/errors';



const handleCastError = (err: mongoose.Error.CastError) :TGenericErrorResponse => {

    const errorMessages : TerrorMessages = [
        { path: err?.path, message: err?.message}
    ]
    

    const statusCode = 400;

    return {
        statusCode,
        message: "Cast Error[Invalid Id]",
        errorMessages
    }
};

export default handleCastError;