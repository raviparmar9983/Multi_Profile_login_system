import { NextFunction, Request, Response } from "express";
import Jwt from "../jwt/JwtValidatorGenerator";
import { JwtPayload, TokenExpiredError, decode } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/userModel'
import Profile, { IProfile } from "../models/profileModel";

const jwtService = new Jwt()

export interface extendedRequest extends Request {
    userId?: string,
    profileId?: string
}

export default class Authenticator {


    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const token: string | undefined = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('unauthorize')
            }
            const decoded:any=await jwtService.verifyJWT(token)

            if(!decoded){
                throw new Error("somthing  went wrong")
            }
            const userId=decoded.useId;
            const profileId=decoded.profileId;
            if(userId && profileId && await User.findById(userId) && await Profile.findById(profileId)){
                (req as extendedRequest).userId=userId;
                (req as extendedRequest).profileId=profileId;
            }
            next()
        }
        catch (err:any) {
            res.status(500).json({
                message:err.message
            })
        }
    }
    public async userAuthenticate(req:Request,res:Response,next:NextFunction){
        try{
            const userId=(req as extendedRequest).userId;
            const user:IUser|null =await User.findById(userId);
            if(!user){
                throw new Error('user not found please try again');
            }
            next();
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    public async profileAuthenticate(req:Request,res:Response,next:NextFunction){
        try{
            const profileId=(req as extendedRequest).profileId;
            const userId=(req as extendedRequest).userId;
            const profile:IProfile |null=await Profile.findOne({_id:profileId,userId:userId});
            if(!profile){
                throw new Error('somthing went wrong');
            }
            next()
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
}