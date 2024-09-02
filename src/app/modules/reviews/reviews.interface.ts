import { Types } from "mongoose";

export type TReviews = {
  user: Types.ObjectId;
 feedback: string;
 rating: number;
 profileImg?:string;
  
 
};
