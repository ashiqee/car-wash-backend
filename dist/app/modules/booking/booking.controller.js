"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_services_1 = require("./booking.services");
const user_model_1 = require("../user/user.model");
const serviceSlots_model_1 = require("../serviceSlots/serviceSlots.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createServiceBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const user = req.user;
    if (!user || !user.userEmail) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'User information is missing.');
    }
    // check service slot 
    const checkBookedSolt = yield serviceSlots_model_1.ServicesSlot.findById(bookingData.slotId);
    if (!checkBookedSolt || checkBookedSolt.isBooked === 'booked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Slot is already booked");
    }
    const checkBookedSlotServiceId = checkBookedSolt.service.toHexString();
    const bookingDataServiceId = bookingData.serviceId;
    if (checkBookedSlotServiceId !== bookingDataServiceId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Service or Slot is not valid");
    }
    const customer = yield user_model_1.User.findOne({ email: user.userEmail });
    bookingData.customer = customer === null || customer === void 0 ? void 0 : customer._id;
    bookingData.service = bookingDataServiceId;
    bookingData.slot = bookingData.slotId;
    // booking succes after update booked
    if (customer) {
        yield serviceSlots_model_1.ServicesSlot.findByIdAndUpdate(bookingData.slotId, { isBooked: 'processing' }, { new: true });
    }
    const result = yield booking_services_1.serviceBookings.createServiceBookingIntoDB(bookingData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking successful',
        data: result,
    });
}));
//get all bookings by admin
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.serviceBookings.getAllServiceBookingFromDB();
    if (result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All bookings retrieved successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createServiceBooking,
    getAllBookings,
};
