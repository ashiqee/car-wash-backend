import mongoose from 'mongoose';
import { TerrorMessages } from '../interface/errors';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorMessages: TerrorMessages = Object.values(err.errors).map((val) => {
    if (
      val instanceof mongoose.Error.ValidatorError ||
      val instanceof mongoose.Error.CastError
    ) {
      return {
        path: val.path,
        message: val.message,
      };
    } else {
      return {
        path: 'unknown',
        message: 'Unknown error',
      };
    }
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationError;
