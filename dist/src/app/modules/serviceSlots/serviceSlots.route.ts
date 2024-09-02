
import  express  from 'express';
import { ServiceSlotsController } from './serviceSlots.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';




const router = express.Router()



router.get('/availability', ServiceSlotsController.getAllAvailableServiceSlot)
router.get('/', auth(USER_ROLE.admin), ServiceSlotsController.getAllServiceSlot)
router.put('/status/:id', auth(USER_ROLE.admin), ServiceSlotsController.updateSlotStatus)


export const ServiceSlotsRoutes = router;