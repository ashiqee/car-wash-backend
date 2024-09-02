/* eslint-disable no-undef */
import { join } from "path";

import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { ServiceBooking } from "../booking/booking.model";
import { ServicesSlot } from "../serviceSlots/serviceSlots.model";

const confirmationService = async (transactionId: string) => {
    
    
    const verifyResponse = await verifyPayment(transactionId);
    

    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await ServiceBooking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });
        const slotId = result?.slot;
     
        

        if(result){
             await ServicesSlot.findByIdAndUpdate({_id:slotId},{
                isBooked: "booked"
            })
        }

        message = `${transactionId}`
    }
    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../views/confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}

export const paymentServices = {
    confirmationService
}