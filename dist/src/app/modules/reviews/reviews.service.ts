
import { TReviews } from "./reviews.interface";
import { ReviewModel } from "./reviews.model";




// create review

const createReviewToDB = async(payload:TReviews)=>{

  const result = await ReviewModel.create(payload)


  return result;
}
// get all reviews

const getAllReviewFromDB = async()=>{

  const result = await ReviewModel.find()
  .populate('user','-__v')
  .select('-__v')

  return result;
}







  export const ReviewServices = {
    getAllReviewFromDB,
    createReviewToDB
  }