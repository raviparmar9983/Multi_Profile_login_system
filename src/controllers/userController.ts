import { Request,Response } from "express";
import userService from "../services/userService";
import { IUser } from "../models/userModel";
import JwtService from '../jwt/JwtValidatorGenerator'
import ProfileService from "../services/profileService";

const jwt=new JwtService();

class UserController{
    public static async signUp(req:Request,res:Response){
        try{
            const newUser=await userService.createUser(req.body)
            res.status(200).json(newUser)
        }
        catch(err:any){
            res.status(409).json({
                message:err.message
            })
        }
    }
    public static async login(req:Request,res:Response){
        try{
           const user=await userService.findUser(req.body.email,req.body.password);
           const profile=await ProfileService.getProfileByFilter({userId:user!._id,isMain:true});
           if(user && profile && user._id && profile._id){
                const token=await jwt.genrate(user._id,profile._id)
                res.status(200).json({
                    status:'success',
                    token
                })
           } 
           else{
                throw new Error('somthing went wrong please try again')
           }
        }
        catch(err:any){
            res.json({
                message:err.message
            })
        }
    }
}

export default UserController;