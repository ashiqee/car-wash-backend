import { Schema, model } from "mongoose";
import { TService } from "./service.interface";



const ServiceSchema = new Schema<TService>(
    {
        name:{
            type: String,
            required: true,
            unique:true
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        duration:{
            type: Number,
            required: true,
        },
        isDeleted:{
            type: Boolean,
            required: true,
            default:false,
        },
    },{
        timestamps:true,
    }
)

ServiceSchema.pre("find",function(next){
    this.find({isDeleted:{$ne:true}});
    next()
});

ServiceSchema.pre("findOne",function(next){
    this.find({isDeleted:{$ne:true}});
    next()
})

export const Service =  model<TService>('Service',ServiceSchema)

