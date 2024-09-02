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
exports.paymentServices = void 0;
/* eslint-disable no-undef */
const path_1 = require("path");
const payment_utils_1 = require("./payment.utils");
const fs_1 = require("fs");
const booking_model_1 = require("../booking/booking.model");
const serviceSlots_model_1 = require("../serviceSlots/serviceSlots.model");
const confirmationService = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let result;
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = yield booking_model_1.ServiceBooking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });
        const slotId = result === null || result === void 0 ? void 0 : result.slot;
        if (result) {
            yield serviceSlots_model_1.ServicesSlot.findByIdAndUpdate({ _id: slotId }, {
                isBooked: "booked"
            });
        }
        message = `${transactionId}`;
    }
    else {
        message = "Payment Failed!";
    }
    const filePath = (0, path_1.join)(__dirname, '../../../views/confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    template = template.replace('{{message}}', message);
    return template;
});
exports.paymentServices = {
    confirmationService
};
