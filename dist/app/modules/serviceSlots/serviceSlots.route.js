"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSlotsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const serviceSlots_controllers_1 = require("./serviceSlots.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/availability', serviceSlots_controllers_1.ServiceSlotsController.getAllAvailableServiceSlot);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), serviceSlots_controllers_1.ServiceSlotsController.getAllServiceSlot);
router.put('/status/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), serviceSlots_controllers_1.ServiceSlotsController.updateSlotStatus);
exports.ServiceSlotsRoutes = router;
