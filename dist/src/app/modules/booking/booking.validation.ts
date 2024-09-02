import { z } from "zod";
import { vehicaleBrand, vehicaleType } from "./booking.constant";


const createBookingValidationSchema = z.object({
    body:z.object({
       
        serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID"),
        slotId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid slot ID"),
        vehicleType: z.enum([...vehicaleType] as [string, ...string[]]),
        vehicleBrand: z.enum([...vehicaleBrand]as [string, ...string[]]),
        vehicleModel: z.string(),
        manufacturingYear: z.number(),
        registrationPlate:z.string()
    })
})


export const BookingValidation = {
    createBookingValidationSchema
}