"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
// Define the TRole schema
const RoleValidation = zod_1.z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
});
// Define the TUser schema with custom error messages
const CreateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: "Name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }),
        phone: zod_1.z.string().min(10, { message: "Phone number must be at least 10 digits long" }).max(15, { message: "Phone number must be at most 15 digits long" }),
        role: RoleValidation,
        address: zod_1.z.string().nonempty({ message: "Address is required" }),
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: " Password is required" })
    })
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "refresh token is required"
        })
    })
});
exports.UserValidations = {
    CreateUserValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema
};
