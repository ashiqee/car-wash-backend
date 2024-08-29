/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TTUserInfo, TUser, TUserAuth } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import { createToken, verifyToken } from './userAuth.utils';
import { string } from 'zod';
import { query } from 'express';

export interface IUserDocument extends TUser, Document {}
//user registration 

const createUserIntoDB = async (payload: TUser) => {
  const isUserExits = await User.findOne({ email: payload.email });
  if (isUserExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Already Exists');
  }

  try {
    const userData: Partial<TUser> = payload;

    userData.password = payload.password || (config.DEFAULT_PASSWORD as string);

    const newUser = await User.create(userData);

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user');
    }
    return newUser;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
};

// get a user info 
const getUserFromDB = async(query:TTUserInfo)=>{
  
  const userDetails = await User.findOne({email:query.userEmail})

  return userDetails;
}

// get a user info for admin 
const getAllUserFromDB = async()=>{
  
  const userDetails = await User.find()

  return userDetails;
}


//user Login

const userSignIntoDB = async(payload: TUserAuth )=>{

   const user = await User.isUserExistByEmail(payload.email);

   
;

   if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"This user is not registered")
   }

   if(typeof payload.password !=="string"){
    throw new AppError(httpStatus.BAD_REQUEST,"Please provide password")
   }

   if(!(await User.isPasswordMatched(payload.password, user?.password as string))){
    throw new AppError(httpStatus.FORBIDDEN, "Password not matched")
   }

   const jwtPayload = {
    userEmail:user.email,
    role: user.role,
   };

   const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
   )
   const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
   )


  //  const userObject = user.toObject() as TUser;

  //  //sent user data without password
   

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {password, ...userWithoutPassword} =user.toObject();
   

   return {
    accessToken,
    refreshToken,
    user: userWithoutPassword

   }

}

const refreshToken = async (token: string)=>{
  const decoded = verifyToken(token,config.JWT_REFRESH_SECRET as string);

  const {userEmail,iat}=decoded;

  const user = await User.isUserExistByEmail(userEmail);
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND,"This user is not register")

  }

  const jwtPayload = {
    userEmail: user.email,
    role:user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  )

  return{
    accessToken
  }
}


export const userServices = {
  createUserIntoDB,
  userSignIntoDB,
  refreshToken,
  getAllUserFromDB,
  getUserFromDB
};
