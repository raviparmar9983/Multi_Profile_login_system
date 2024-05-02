import mongoose from "mongoose";
import User,{IUser} from '../models/userModel'
import bcrypt from 'bcrypt'

class userService{
    static async createUser(user:IUser):Promise<IUser|void>{
        const {name,email,password}=user;
        if(await User.findOne({email})){
            const error= new Error("User is already exsist")
            throw error
        }
        const encPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND!));
        return await User.create({name,email,password:encPassword});
    }
    static async findUser(email:string,password:string):Promise<IUser|null|void>{
        const user=await User.findOne({email}).select('+password');
        if(!user){
            throw new Error('User is does not exist with this email please sign up');
        }
        else if(!await bcrypt.compare(password,user.password)){
            throw new Error('password is not match');
        }
        else{
            return user;
        }
    }
}

export default userService