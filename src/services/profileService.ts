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
        return await Profile.findOneAndUpdate({_id:profileId},{...user},{new:true,upsert:true})
    }
    static async deleteProfile(id:string|null){
        const profile:IProfile|null=await Profile.findById(id);
        if(!profile){
            throw new Error('profile not found')
        }
        if(profile.isMain){
            throw new Error('main Profile cannot deleted');
        }
        return await Profile.deleteOne({_id:id})
    }
    static async switchProfile(id:string,password:string){
        const profile:IProfile|null=await Profile.findById(id)
        if(!profile){
            throw new Error('profile not found');
        }
        const comparision:boolean=await bcrypt.compare(password,profile.password);
        if(!comparision){
            throw new Error('Password is not Match');
        }
        return comparision;
    }
}