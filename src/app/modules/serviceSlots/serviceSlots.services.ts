import { TQuery } from "../booking/booking.interface";
import { TServiceSlot } from "./serviceSlots.interface";
import { ServicesSlot } from "./serviceSlots.model";



// get all services

const getAllServicesSlotsFromDB = async()=>{

  const result = await ServicesSlot.find()
  .populate('service','-__v')
  .sort({createdAt:-1})

  return result;
}


const getAllServicesAvailableSlotFromDB = async (payload:TQuery) => {
    const {date,serviceId}=payload;
// let query:any;
// const query: any = {isBooked:{$eq:"available"}}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const query: any = {}
    if(date){
        query.date =date;
    }

    if(serviceId){
        query.service =serviceId;
    }
    const result = await ServicesSlot.find(query)
    .populate('service','-__v')
    .sort({createdAt:-1})
    return result;
  };


  const updateSlotsStatusIntoDB = async (id: string, payload: Partial<TServiceSlot>)=>{

  
    const result = await ServicesSlot.findByIdAndUpdate(id, {isBooked:payload.isBooked}, {
      new: true,
      runValidators: true,
    }).select('-__v');

    return result;
  
  }
  



  export const slotsServices = {
    getAllServicesAvailableSlotFromDB,
    getAllServicesSlotsFromDB,
    updateSlotsStatusIntoDB
  }