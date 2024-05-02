import Profile,{IProfile} from "../models/profileModel";
import bcrypt, { hash } from 'bcrypt'
export default class ProfileService{
    constructor(){}

    static async getAllProfile(userId:string){
        return await Profile.find({userId});
    }
    static async createProfile(userId:string,name:string,password:string){
        const encPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND!))
        return await Profile.create({userId,name,password:encPassword});
    }
    static async getProfileByFilter(filter:any){
        return await Profile.findOne(filter);
    }
    static async updateProfile(profileId:string,user:any){
        return Profile.findOneAndUpdate({_id:profileId},{...user},{new:true,upsert:true})
    }
}