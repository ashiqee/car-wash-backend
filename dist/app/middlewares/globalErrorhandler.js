"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [
        { path: '', message: 'Something went wrong' },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiederror = (0, handleZodError_1.default)(err);
        statusCode = simplifiederror.statusCode;
        message = simplifiederror.message;
        errorMessages = simplifiederror.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiederror = (0, handleValidationError_1.default)(err);
        statusCode = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.statusCode;
        message = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.message;
        errorMessages = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiederror = (0, handleCastError_1.default)(err);
        statusCode = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.statusCode;
        message = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.message;
        errorMessages = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiederror = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.statusCode;
        message = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.message;
        errorMessages = simplifiederror === null || simplifiederror === void 0 ? void 0 : simplifiederror.errorMessages;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = [{
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            }];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = [{
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            }];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorHandler;
