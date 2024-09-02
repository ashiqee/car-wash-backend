"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBooking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const BookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Service',
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'ServicesSlot',
        unique: true,
    },
    vehicleType: {
        type: String,
        enum: booking_constant_1.vehicaleType,
    },
    vehicleBrand: {
        type: String,
        enum: booking_constant_1.vehicaleBrand,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    transactionId: {
        type: String,
    }
}, {
    timestamps: true
});
exports.ServiceBooking = (0, mongoose_1.model)('ServiceBooking', BookingSchema);
