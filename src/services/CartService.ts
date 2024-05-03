import Cart, { ICart } from "../models/cartModel";
import Product,{IProduct} from "../models/productModel";

export default class CartService{
    static async getAll(){

    }
    static async addTocart(profileId:string,id:string,quantity:number):Promise<ICart>{
        return await Cart.findOneAndUpdate({profileId},{$push:{products:{product:id,quantity}}},{new:true,upsert:true,runValidators:true});
    }
    static async deleteCart(){

    }

}