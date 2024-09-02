

import { z } from "zod";

// Define the TRole schema
const RoleValidation = z.enum(["user", "admin"], {
  errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
});

// Define the TUser schema with custom error messages
const CreateUserValidationSchema = z.object({
    body: z.object({
        
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits long" }).max(15, { message: "Phone number must be at most 15 digits long" }),
  role: RoleValidation,
  address: z.string().nonempty({ message: "Address is required" }),
    })
});


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({required_error:"Email is required"}),
    password: z.string({required_error: " Password is required"})
  })
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken : z.string({
      required_error:"refresh token is required"
    })
  })
})

export const UserValidations = {
  CreateUserValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema
};
