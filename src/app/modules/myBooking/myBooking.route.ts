import express from 'express';

import { myBookingController } from './myBooking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.user), myBookingController.getUserBookings);

export const myBookingRoutes = router;
