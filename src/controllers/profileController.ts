import { Request,Response } from "express";
import ProfileService from "../services/profileService";
import { extendedRequest } from "../middlerware/authentication";
import jwt from '../jwt/JwtValidatorGenerator'

const jwtService=new jwt()


export default class ProfileController{
    constructor(){
    }
    static async getAllProfiles(req:extendedRequest,res:Response){
        try{     

            const profile= await ProfileService.getAllProfile(req.userId!)
            res.status(200).json({
                status:"sucess",
                data:profile
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async createProfile(req:extendedRequest,res:Response){
        try{
            const profile= await ProfileService.createProfile(req.userId!,req.body.name,req.body.password);
            res.status(200).json({
                status:'sucess',
                profile
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async updateProfile(req:extendedRequest,res:Response){
        try{
            const profileid=req.profileId
            const updateProfile=await ProfileService.updateProfile(profileid!,req.body);
            res.status(200).json({
                status:"success",
                updateProfile
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async deleteProfile(req:extendedRequest,res:Response){
        try{
            const profileid:string|null=req.params.id;
            const deletedprofile=await ProfileService.deleteProfile(profileid);
            res.json({
                deletedprofile
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }   
    static async switchProfile(req:extendedRequest,res:Response){
        try{
            const switchProfileid:string|null=req.body.id;
            const switchProfilePass:string|null=req.body.password;
            if(!switchProfileid || !switchProfilePass){
                throw new Error('Please enter id and password')
            }
            const profile=await ProfileService.switchProfile(switchProfileid,switchProfilePass);
            const token=await jwtService.genrate(req.userId!,req.body.id);
            res.status(200).json({
                status:"success",
                token
            })
        }   
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
}