import { NextFunction } from "express";
import mongoose,{Schema,Document, Model, Mongoose} from "mongoose";

export interface IProfile extends Document{
    name:string,
    password:string,
    userId:Schema.Types.ObjectId,
    isMain?:boolean
}


const profileSchema:Schema=new Schema<IProfile>({
    name:{
        type:String,
        required:[true,'Profile must Have a Name'],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'password must required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User are not create profile first create user account or login ']
    },
    isMain:{
        type:Boolean,
        default:false,
    }
})

profileSchema.pre('validate',async function(next){
    try {
        const profile = this;
        const { name, userId } = profile;
        // Check if a profile with the same name and userId already exists
        const existingProfile = await Profile.findOne({ name, userId });
        
        if (existingProfile) {
            throw new Error('Profile with this name already exists');
        }
        
        // If no existing profile found, continue with the save operation
        next();
    } catch (error:any) {
        // Handle errors
        next(error); // Pass the error to the next middleware
    }
    
})
const Profile:mongoose.Model<IProfile>=mongoose.model<IProfile>("Profile",profileSchema)

export default Profile

