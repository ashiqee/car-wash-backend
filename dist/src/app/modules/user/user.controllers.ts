import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";
import config from "../../config";


const createUser = catchAsync(async (req,res)=>{
    const userData=req.body;


    const result =  await userServices.createUserIntoDB(userData);

    const resultObj = result.toObject();
    delete resultObj.password;
    delete resultObj.__v;

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "User registered successfully",
        data: resultObj,
    })
})
// get User 
const getUser = catchAsync(async (req,res)=>{
    const userEmail=req.query;


    const result =  await userServices.getUserFromDB(userEmail);

    // const resultObj = result.toObject();
    // delete resultObj.password;
    // delete resultObj.__v;

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Get User Info successfully",
        data: result,
    })
})
// get all User 
const getAllUser = catchAsync(async (req,res)=>{
const filterQuery = req.query

    const result =  await userServices.getAllUserFromDB(filterQuery);

    // const resultObj = result.toObject();
    // delete resultObj.password;
    // delete resultObj.__v;

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Get All User Info successfully",
        data: result,
    })
})

// update user Role 
const updateUserRole = catchAsync(async (req,res)=>{
    const {id}=req.params;
    const payload=req.body

    const result =  await userServices.updateUserIntoDb(id,payload);

    // const resultObj = result.toObject();
    // delete resultObj.password;
    // delete resultObj.__v;

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Update User Role successfully",
        data: result,
    })
})
// update user Information 
const updateUser = catchAsync(async (req,res)=>{
    const {id}=req.params;
    const payload=req.body

    const result =  await userServices.updateUserInfoIntoDb(id,payload);

    // const resultObj = result.toObject();
    // delete resultObj.password;
    // delete resultObj.__v;

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Update User Role successfully",
        data: result,
    })
})



// login user 

const signInUser = catchAsync(async(req,res)=>{
    const result = await userServices.userSignIntoDB(req.body);
    const {refreshToken,accessToken,user} = result;

    res.cookie('refreshToken',refreshToken,{
        secure: config.NODE_ENV === 'production',
        httpOnly:true,
        sameSite:'none',
        maxAge: 1000*60*60*24*365,
    })
    delete user.__v
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:"User logged in successfully",
        token: `${accessToken}`,
        data:user
    })
})



// refresh Token 

const refreshToken = catchAsync(async(req,res)=>{
    const {refreshToken}= req.cookies;
    const result = await userServices.refreshToken(refreshToken);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:"Access token is retrived successfully",
        data:result
    })
    
})


export const UserControllers = {
    createUser,
    signInUser,
    refreshToken,
    getUser,
    getAllUser,
    updateUserRole,
    updateUser
}