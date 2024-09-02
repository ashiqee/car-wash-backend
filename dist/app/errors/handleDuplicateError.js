"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const value = match && match[1];
    const errorMessages = [
        {
            path: '',
            message: `Duplicate error: ${value} is already exists`
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast Error[Invalid Id]",
        errorMessages
    };
};
exports.default = handleDuplicateError;
