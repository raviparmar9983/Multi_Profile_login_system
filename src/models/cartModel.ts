import mongoose,{Schema,Document, Mongoose} from "mongoose";

interface IProduct {
    product:Schema.Types.ObjectId,
    quantity:number
}

export interface ICart extends Document{
    profileId:Schema.Types.ObjectId,
    products:[IProduct]
}
const cartSchema:Schema=new Schema<ICart>({
    profileId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    products:{
        type:[
            {
                product:{
                    type:mongoose.Types.ObjectId,
                },
                quantity:{
                    type:Number,
                }
            }
        ]
    }
})
const Cart=mongoose.model<ICart>("Cart",cartSchema);


export default Cart;