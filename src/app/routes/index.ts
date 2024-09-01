import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ServiceRoutes } from "../modules/Services/service.route";
import { ServiceSlotsRoutes } from "../modules/serviceSlots/serviceSlots.route";
import { serviceBookingRoutes } from "../modules/booking/booking.route";

import { myBookingRoutes } from "../modules/myBooking/myBooking.route";
import { paymentRoutes } from "../modules/payment/payment.route";



const router = Router()





const moduleRoutes = [
    {
        path:"/auth",
        route: UserRoutes,
    },
    {
        path:"/services",
        route: ServiceRoutes,
    },
    {
        path:"/slots",
        route: ServiceSlotsRoutes,
    },
    {
        path:"/bookings",
        route: serviceBookingRoutes,
    },
    {
        path:"/my-bookings",
        route: myBookingRoutes,
    },
    {
        path:"/payment",
        route: paymentRoutes,
    },

]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})


export default router;