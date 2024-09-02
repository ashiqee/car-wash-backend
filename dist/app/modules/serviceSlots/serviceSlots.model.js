"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesSlot = void 0;
const mongoose_1 = require("mongoose");
const ServiceSlotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        // type: String,
        ref: "Service",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        enum: ["available", "booked", "canceled", "processing"],
        default: 'available',
    }
}, {
    timestamps: true,
});
// ServiceSlotSchema.pre("find",function(next){
//     this.find({isBooked:{$eq:"available"}});
//     next()
// });
exports.ServicesSlot = (0, mongoose_1.model)('ServicesSlot', ServiceSlotSchema);
