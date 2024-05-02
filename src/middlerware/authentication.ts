import { NextFunction, Request, Response } from "express";
import Jwt from "../jwt/JwtValidatorGenerator";
import { JwtPayload, decode } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import Profile from "../models/profileModel";

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
        catch (err) {
            next(err)
        }
    }
    
}