"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID"),
        slotId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid slot ID"),
        vehicleType: zod_1.z.enum([...booking_constant_1.vehicaleType]),
        vehicleBrand: zod_1.z.enum([...booking_constant_1.vehicaleBrand]),
        vehicleModel: zod_1.z.string(),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string()
    })
});
exports.BookingValidation = {
    createBookingValidationSchema
};
