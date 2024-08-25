import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { vehicaleBrand, vehicaleType } from './booking.constant';

const BookingSchema = new Schema<TBooking>({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  service: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Service',
  },
  slot: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ServicesSlot',
    unique:true,
  },

  vehicleType: {
    type: String,
    enum: vehicaleType,
  },
  vehicleBrand: {
    type: String,
    enum: vehicaleBrand,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  registrationPlate: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});


export const ServiceBooking = model<TBooking>('ServiceBooking',BookingSchema)