import mongoose, { Document, Schema } from "mongoose";
import Profile, { IProfile } from "./profileModel";
import validator from 'validator'
export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: function (val: string) {
                return validator.isEmail(val)
            },
            message: 'invalid email'
        }
    },
    password: {
        type: String,
        required: [true, 'password must requires'],
        select: false
    }
})

userSchema.post('save', async function (doc, next) {
    try {
        const { name, password, _id: userId } = doc;
        await Profile.create({ name, password, userId, isMain: true })
        next()
    }
    catch(err:any){
        next(err)
    }
})

export default mongoose.model<IUser>("User", userSchema)