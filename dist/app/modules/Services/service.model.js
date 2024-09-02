"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: String,
    },
    serviceLevel: {
        type: String,
        enum: ["Standard", "Premium", "Deluxe", "Express", "Eco-Friendly"]
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
ServiceSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
ServiceSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.Service = (0, mongoose_1.model)('Service', ServiceSchema);
