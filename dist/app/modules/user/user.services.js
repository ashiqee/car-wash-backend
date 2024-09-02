"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const userAuth_utils_1 = require("./userAuth.utils");
//user registration 
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExits = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User Already Exists');
    }
    try {
        const userData = payload;
        userData.password = payload.password || config_1.default.DEFAULT_PASSWORD;
        const newUser = yield user_model_1.User.create(userData);
        if (!newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create new user');
        }
        return newUser;
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
    }
});
// get a user info 
const getUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield user_model_1.User.findOne({ email: query.userEmail });
    return userDetails;
});
// get a user info for admin 
const getAllUserFromDB = (filterQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    //searchTerm
    if (filterQuery.searchTerm) {
        query.$or = [
            { name: { $regex: filterQuery.searchTerm, $options: 'i' } },
            { role: { $regex: filterQuery.searchTerm, $options: 'i' } }
        ];
    }
    const userDetails = yield user_model_1.User.find(query);
    return userDetails;
});
// user role update 
const updateUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const remainingServiceData = __rest(payload, []);
    const modifiedUpdateData = Object.assign({}, remainingServiceData);
    const result = yield user_model_1.User.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    }).select('-__v');
});
const updateUserInfoIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const remainingServiceData = __rest(payload, []);
    const modifiedUpdateData = Object.assign({}, remainingServiceData);
    const result = yield user_model_1.User.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    }).select('-__v');
});
//user Login
const userSignIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload.email);
    ;
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not registered");
    }
    if (typeof payload.password !== "string") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Please provide password");
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password not matched");
    }
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, userAuth_utils_1.createToken)(jwtPayload, config_1.default.JWT_ACCESS_SECRET, config_1.default.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, userAuth_utils_1.createToken)(jwtPayload, config_1.default.JWT_REFRESH_SECRET, config_1.default.JWT_REFRESH_EXPIRES_IN);
    //  const userObject = user.toObject() as TUser;
    //  //sent user data without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, userAuth_utils_1.verifyToken)(token, config_1.default.JWT_REFRESH_SECRET);
    const { userEmail, iat } = decoded;
    const user = yield user_model_1.User.isUserExistByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not register");
    }
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, userAuth_utils_1.createToken)(jwtPayload, config_1.default.JWT_ACCESS_SECRET, config_1.default.JWT_ACCESS_EXPIRES_IN);
    return {
        accessToken
    };
});
exports.userServices = {
    createUserIntoDB,
    userSignIntoDB,
    refreshToken,
    getAllUserFromDB,
    getUserFromDB,
    updateUserIntoDb,
    updateUserInfoIntoDb
};
