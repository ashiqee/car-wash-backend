import { Schema, model } from "mongoose"
import { TReviews } from "./reviews.interface"




const ReviewsSchema = new Schema<TReviews>(
    {
        user:{
            type: Schema.Types.ObjectId,
            // type: String,
            ref:"User",
            required:true,
        },
        feedback:{
            type: String,
            required:true,
        },
        rating:{
            type:Number,
            required:true
        },
        profileImg:{
            type:String,
        }
        
    },{
        timestamps:true,
    }
)





export const ReviewModel = model<TReviews>('Reviews',ReviewsSchema)