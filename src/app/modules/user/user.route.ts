
import  express  from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validation';




const router = express.Router()

router.post('/signup',validateRequest(UserValidations.CreateUserValidationSchema),UserControllers.createUser);

router.post('/login', validateRequest(UserValidations.loginValidationSchema),UserControllers.signInUser);

router.post('/refresh-token',validateRequest(UserValidations.refreshTokenValidationSchema),UserControllers.refreshToken);


export const UserRoutes = router;






// import  express  from 'express';




// const router = express.Router()

// router.post('/',)


// export const UserRoutes = router;