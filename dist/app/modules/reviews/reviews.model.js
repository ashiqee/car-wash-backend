"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewsSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        // type: String,
        ref: "User",
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    profileImg: {
        type: String,
    }
}, {
    timestamps: true,
});
exports.ReviewModel = (0, mongoose_1.model)('Reviews', ReviewsSchema);
