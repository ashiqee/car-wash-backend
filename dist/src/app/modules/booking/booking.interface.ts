import { Types } from 'mongoose';

type VehicleType =
  | 'car'
  | 'truck'
  | 'suv'
  | 'van'
  | 'motorcycle'
  | 'bus'
  | 'electricVehicle'
  | 'hybridVehicle'
  | 'bicycle'
  | 'tractor';

type VehicaleBrand = 
| "Tata"
| "Runner"
| "Hyundai"
| "Hino"
| "Corolla"
| "Bmw"
| "Ferrari"
| "Toyota"
| "Honda"
| "Ford"
| "Chevrolet"
| "Nissan"
| "Volkswagen"
| "Mercedes Benz"
| "Audi";
   

export interface TQuery {
    date?: string;
    serviceId?: string
}

export interface TBooking {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: VehicleType;
  vehicleBrand: VehicaleBrand;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate:string;
  paymentStatus?:string;
  transactionId:string;
  
}
