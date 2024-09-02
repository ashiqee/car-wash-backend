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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceBookings = void 0;
const payment_utils_1 = require("../payment/payment.utils");
const service_model_1 = require("../Services/service.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const createServiceBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = `txn-${Date.now()}`;
    const orderData = Object.assign(Object.assign({}, payload), { transactionId });
    const createOrder = yield booking_model_1.ServiceBooking.create(orderData);
    if (createOrder) {
        try {
            const service = yield service_model_1.Service.findById(orderData.service);
            const user = yield user_model_1.User.findById(orderData.customer);
            const totalPrice = (service === null || service === void 0 ? void 0 : service.price) || 0;
            const paymentData = {
                transactionId,
                totalPrice,
                customerName: user.name,
                customerEmail: user.email,
                customerPhone: user.phone,
                customerAddress: user.address
            };
            //payment
            const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
            // const populateBooking = await ServiceBooking.findById(createOrder._id)
            // .populate('customer service slot','-role -__v -createdAt -updatedAt').select('-__v');
            return paymentSession;
        }
        catch (err) {
            return err;
        }
    }
});
//get all booking admin
const getAllServiceBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = booking_model_1.ServiceBooking.find()
        .populate('customer service slot', '-role -__v -createdAt -updatedAt').select('-__v')
        .sort({ createdAt: -1 });
    return result;
});
//get users all booking get user
const getUsersBookingsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.ServiceBooking.find({ customer: userId })
        .populate('service slot', '-__v -createdAt -updatedAt').select('-customer -__v');
    return result;
});
exports.serviceBookings = {
    createServiceBookingIntoDB,
    getAllServiceBookingFromDB,
    getUsersBookingsFromDB
};
