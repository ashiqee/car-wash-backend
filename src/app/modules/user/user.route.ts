
import  express  from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';




const router = express.Router()

router.post('/signup',validateRequest(UserValidations.CreateUserValidationSchema),UserControllers.createUser);

router.post('/login', validateRequest(UserValidations.loginValidationSchema),UserControllers.signInUser);

router.post('/refresh-token',validateRequest(UserValidations.refreshTokenValidationSchema),UserControllers.refreshToken);
router.get('/user',auth(USER_ROLE.admin,USER_ROLE.user), UserControllers.getUser);
router.get('/users',auth(USER_ROLE.admin), UserControllers.getAllUser);
router.put('/user/:id',auth(USER_ROLE.admin), UserControllers.updateUserRole);
router.put('/userInfo/:id',auth(USER_ROLE.admin,USER_ROLE.user), UserControllers.updateUserRole);


export const UserRoutes = router;






// import  express  from 'express';




// const router = express.Router()

// router.post('/',)


// export const UserRoutes = router;