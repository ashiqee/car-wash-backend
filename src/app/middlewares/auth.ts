import { NextFunction, Request, Response } from 'express';
import { TRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new AppError(httpStatus.UNAUTHORIZED,"No token provided or invalid token")
    }

    // split token form bearer 
    const token = authHeader.split(' ')[1];


    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorited');
    }

    const decoded = jwt.verify(
      token as string,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { role, userEmail, iat } = decoded;

    const user = await User.isUserExistByEmail(userEmail);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
      }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
    }



    req.user = decoded as JwtPayload & {role: string};
    next()
  
  });
};


export default auth;