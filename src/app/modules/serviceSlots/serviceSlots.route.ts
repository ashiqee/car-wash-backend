
import  express  from 'express';
import { ServiceSlotsController } from './serviceSlots.controllers';




const router = express.Router()



router.get('/', ServiceSlotsController.getAllServiceSlot)


export const ServiceSlotsRoutes = router;