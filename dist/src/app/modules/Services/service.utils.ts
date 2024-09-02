import { Types } from "mongoose";
import { TServiceSlot } from "../serviceSlots/serviceSlots.interface";



export const convertTimeToMinutes = (time:string):number =>{
    const [hours,mintues]=time.split(':').map(Number);
    return hours * 60 + mintues;
}

const convertMinutesToTime = (minutes: number): string=>{
    const hours = Math.floor(minutes/60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}`;
};



export const generateTimeSlots = (service:Types.ObjectId,date:string,startTime:string,endTime:string,serviceDuration:number):TServiceSlot[] =>{

    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    const totalDuration = endMinutes - startMinutes;
    const numberOfSlots = totalDuration/serviceDuration;

    const slots: TServiceSlot[]=[];
    for (let i =0; i<numberOfSlots; i++){
        const slotStart = startMinutes + i * serviceDuration;
        const slotEnd = slotStart + serviceDuration;
        const createdAt =new Date().toISOString();
        const updatedAt = createdAt;
        slots.push({
        
            service,
            date,
            startTime: convertMinutesToTime(slotStart),
            endTime: convertMinutesToTime(slotEnd),
            isBooked:"available",
            createdAt,
            updatedAt

        })
    }
    return slots
}