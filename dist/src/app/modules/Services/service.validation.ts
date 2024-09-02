import { z } from "zod";

const createServiceValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty({message:'Name is required'}),
        description: z.string(),
        price:z.number().min(0,{message:"price must be 0 to start"}),
        duration:z.number()

    })
})
const updateServiceValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price:z.number().min(0,{message:"price must be 0 to start"}).optional(),
        duration:z.number().optional()

    })
})




export const  ServiceValidation = {
    createServiceValidationSchema,
    updateServiceValidationSchema
}