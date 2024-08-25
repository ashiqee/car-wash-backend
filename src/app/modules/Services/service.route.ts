
import  express  from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { ServiceValidation } from './service.validation';
import { ServicesController } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { ServiceSlotsValidation } from '../serviceSlots/serviceSlots.validation';



const router = express.Router()



router.post('/',auth(USER_ROLE.admin) ,validateRequest(ServiceValidation.createServiceValidationSchema), ServicesController.CreateService)
router.post('/slots',auth(USER_ROLE.admin) ,validateRequest(ServiceSlotsValidation.createServiceSlotSchema), ServicesController.createServiceSlot)

router.get('/',ServicesController.getAllServices)
router.get('/:id',ServicesController.getSingleService)
router.put('/:id',auth(USER_ROLE.admin) ,validateRequest(ServiceValidation.updateServiceValidationSchema), ServicesController.updateService)
router.delete('/:id',auth(USER_ROLE.admin),validateRequest(ServiceValidation.updateServiceValidationSchema) , ServicesController.deleteService)


export const ServiceRoutes = router;