import { TQuery } from "../booking/booking.interface";
import { TServiceSlot } from "./serviceSlots.interface";
import { ServicesSlot } from "./serviceSlots.model";



// get all services

const getAllServicesSlotsFromDB = async()=>{

  const result = await ServicesSlot.find()
  .populate('service','-__v')
  .select('-__v')

  return result;
}


const getAllServicesAvailableSlotFromDB = async (payload:TQuery) => {
    const {date,serviceId}=payload;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {isBooked:{$eq:"available"}}
    if(date){
        query.date =date;
    }

    if(serviceId){
        query.service =serviceId;
    }
    const result = await ServicesSlot.find(query)
    .populate('service','-__v')
    .select('-__v')
    return result;
  };


  const updateSlotsStatusIntoDB = async (id: string, payload: Partial<TServiceSlot>)=>{

    console.log(payload);
    
  
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