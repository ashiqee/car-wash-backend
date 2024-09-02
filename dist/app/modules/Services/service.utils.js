"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimeSlots = exports.convertTimeToMinutes = void 0;
const convertTimeToMinutes = (time) => {
    const [hours, mintues] = time.split(':').map(Number);
    return hours * 60 + mintues;
};
exports.convertTimeToMinutes = convertTimeToMinutes;
const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
const generateTimeSlots = (service, date, startTime, endTime, serviceDuration) => {
    const startMinutes = (0, exports.convertTimeToMinutes)(startTime);
    const endMinutes = (0, exports.convertTimeToMinutes)(endTime);
    const totalDuration = endMinutes - startMinutes;
    const numberOfSlots = totalDuration / serviceDuration;
    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStart = startMinutes + i * serviceDuration;
        const slotEnd = slotStart + serviceDuration;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        slots.push({
            service,
            date,
            startTime: convertMinutesToTime(slotStart),
            endTime: convertMinutesToTime(slotEnd),
            isBooked: "available",
            createdAt,
            updatedAt
        });
    }
    return slots;
};
exports.generateTimeSlots = generateTimeSlots;
