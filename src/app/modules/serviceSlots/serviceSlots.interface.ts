import { Types } from "mongoose";

export type TServiceSlot = {
  service: Types.ObjectId;

  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled'|"processing";
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
