import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ServiceRoutes } from "../modules/Services/service.route";
import { ServiceSlotsRoutes } from "../modules/serviceSlots/serviceSlots.route";
import { serviceBookingRoutes } from "../modules/booking/booking.route";

import { myBookingRoutes } from "../modules/myBooking/myBooking.route";



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
        path:"/slots/availability",
        route: ServiceSlotsRoutes,
    },
    {
        path:"/bookings",
        route: serviceBookingRoutes,
    },
    {
        path:"/my-bookings",
        route: myBookingRoutes,
    }
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})


export default router;