
import  express  from 'express';


import { ReviewsController } from './reviews.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';




const router = express.Router()



router.post('/', auth(USER_ROLE.user), ReviewsController.createReview)
router.get('/', ReviewsController.getAllReviews)



export const ReviewsRoutes = router;