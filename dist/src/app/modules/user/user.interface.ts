import { Model } from "mongoose";


export type TRole = "user"|"admin"

export type TUser ={
    toObject(): { [x: string]: unknown; password: unknown; };
    name:string;
    email:string;
    password?:string;
    phone:string;
    role: TRole;
    address: string;
    __v?: number;

}

export type TUserAuth = {
    email: string,
    password: string,
}

export type TTUserInfo={
    userEmail:string,
}

export interface UserModel extends Model<TUser>{
    // eslint-disable-next-line no-unused-vars
    isUserExistByEmail(email: string): Promise<TUser>;

    isPasswordMatched(
        // eslint-disable-next-line no-unused-vars
        plainTextPassword:string,
        // eslint-disable-next-line no-unused-vars
        hashedPassword:string,
    ):Promise<boolean>;


}

