import mongoose  from "mongoose";

import Product,{IProduct} from "../models/productModel";

export class ProductService{
    static async getAllProduct():Promise<IProduct|IProduct[]>{
        return Product.find()
    }
    static async getProduct(id:string):Promise< IProduct | null >{
        return await Product.findById(id)
    }
    static async createProduct(product:IProduct|IProduct[]):Promise<IProduct|IProduct[]>{
        return await Product.create(product)
    }
    static async updateProduct(id:string,obj:IProduct):Promise<IProduct>{
        return await Product.findByIdAndUpdate(id,{...obj},{new:true,upsert:true,runValidators:true})
    }
    static async deleteProduct(id:string){
        return await Product.deleteOne({_id:id})
    }
}