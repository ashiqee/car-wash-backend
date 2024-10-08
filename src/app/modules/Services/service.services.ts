/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from './service.model';
import { TService } from './service.interface';
import { ServicesSlot } from '../serviceSlots/serviceSlots.model';
import { TServiceSlot } from '../serviceSlots/serviceSlots.interface';

const createServiceIntoDB = async (payload: TService) => {
  const isServiceExists = await Service.findOne({ name: payload.name });
  if (isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Same Service Name already exist');
  }

  const result = await Service.create(payload);
  
  const { __v, ...resultWithoutV } = result.toObject();

  return resultWithoutV;
};

// get all services

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllServicesFromDB = async (filterQuery:any) => {

  const query:Record<string,unknown>={}

  //searchTerm
  if(filterQuery.searchTerm){
    query.name = {$regex:filterQuery.searchTerm,$options:'i'}
  }

  

  //service level
  if((filterQuery.servicelevel ?? []).length > 0){
    const serviceLevels= filterQuery.servicelevel.split(',')
    query.serviceLevel = { $in: serviceLevels };
  }
  
 
  
  let result = await Service.find(query).select('-__v');

  //sortByPrice
    if(filterQuery.sortByPrice === "priceAsc" || filterQuery.sortByPrice === "priceDesc"){
   
    const sortByPriceResult = filterQuery.sortByPrice === 'priceAsc' ? 1 : -1;
    result = result.sort((a,b)=>{
      return sortByPriceResult * (a.price -b.price)
    })
  }
  //sortByDuration
    if(filterQuery.sortByPrice === "durationAsc" || filterQuery.sortByPrice === "durationDesc"){
   
    const sortByPriceResult = filterQuery.sortByPrice === 'durationAsc' ? 1 : -1;
    result = result.sort((a,b)=>{
      return sortByPriceResult * (a.duration -b.duration)
    })
  }
  return result;
};

// get a service

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id).select('-__v');

  return result;
};

// update services

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const isServiceExists = await Service.findById(id);
  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not found');
  }

  const { ...remainingServiceData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingServiceData,
  };

  const result = await Service.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  }).select('-__v');

  return result;
};

// delete service
const deleteServiceFromDB = async (id: string) => {
  const isServiceExists = await Service.findById(id);

  if (!isServiceExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service does not exist');
  }

  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  ).select('-__v');
  return result;
};

//create service slot create 

const createServiceSlotInDB= async (payload: TServiceSlot[])=>{
  

    const result = await ServicesSlot.create(payload);
    const slotsWithoutV = result.map(slot => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __v, ...slotWithoutV } = slot.toObject();
      return slotWithoutV;
  });
    return slotsWithoutV
}

export const Services = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  createServiceSlotInDB
};
