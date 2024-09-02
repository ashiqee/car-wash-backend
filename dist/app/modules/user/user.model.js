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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, 'name must be required']
    },
    email: {
        type: String,
        require: [true, 'Email must be required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'password must be required'],
        select: 0
    },
    phone: {
        type: String,
        require: [true, 'phone must be required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
    },
    address: {
        type: String,
        require: [true, 'address must be required']
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if ((user === null || user === void 0 ? void 0 : user.password) && typeof user.password === 'string') {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(user.password, Number(config_1.default.BCRYPT_SALT_ROUNDS));
                user.password = hashedPassword;
            }
            catch (err) {
                return next(err);
            }
        }
        // user?.password = await bcrypt.hash(
        //   user?.password,
        //   Number(config.BCRYPT_SALT_ROUNDS),
        // );
        next();
    });
});
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
UserSchema.statics.isUserExistByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select('+password');
    });
};
UserSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
