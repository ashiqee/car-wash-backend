import httpStatus from 'http-status';
import { ObjectId } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { serviceBookings } from './booking.services';
import { User } from '../user/user.model';
import { ServicesSlot } from '../serviceSlots/serviceSlots.model';
import AppError from '../../errors/AppError';


const createServiceBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
console.log(bookingData);

  const user = req.user;

  if (!user || !user.userEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User information is missing.');
  }


  
  // check service slot 
const checkBookedSolt = await ServicesSlot.findById(bookingData.slotId);
if(!checkBookedSolt || checkBookedSolt.isBooked === 'booked'){
  throw new AppError(httpStatus.BAD_REQUEST,"Slot is already booked")
}


const checkBookedSlotServiceId =  checkBookedSolt.service.toHexString();
const bookingDataServiceId =  bookingData.serviceId



if(checkBookedSlotServiceId !== bookingDataServiceId){
  throw new AppError(httpStatus.BAD_REQUEST,"Service or Slot is not valid")
}

  const customer = await User.findOne({ email: user.userEmail });

  bookingData.customer = customer?._id;
  bookingData.service = bookingDataServiceId;
  bookingData.slot = bookingData.slotId;

  // booking succes after update booked
  if (customer) {
    await ServicesSlot.findByIdAndUpdate(
      bookingData.slotId,
      { isBooked: 'booked' },
      { new: true },
    );
  }

  const result = await serviceBookings.createServiceBookingIntoDB(bookingData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: result,
  });
});




//get all bookings by admin
const getAllBookings = catchAsync(async (req, res) => {
  const result = await serviceBookings.getAllServiceBookingFromDB();
  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createServiceBooking,
  getAllBookings,
};
