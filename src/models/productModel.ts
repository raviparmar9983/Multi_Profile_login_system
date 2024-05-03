import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    name:string,
    description:string,
    price:number,
    quantity?:number
}

const productSchema:Schema=new Schema<IProduct>({
    name:{
        type:String,
        required:[true,'produce must have name'],
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:[true,'Producs must have price']
    },
    quantity:{
        type:Number,
    }
})


const Product=mongoose.model<IProduct>('Product',productSchema);

export default Product