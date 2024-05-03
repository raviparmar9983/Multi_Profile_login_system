import { Request,Response } from "express";
import { ProductService } from "../services/productService";
import { IProduct } from "../models/productModel";

export default class ProductController{
    
    static async getAllProduct(req:Request,res:Response):Promise<void>{
        try{
            const product:IProduct|IProduct[]=await ProductService.getAllProduct()
            res.status(200).json({
                status:"success",
                data:product
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async getProduct(req:Request,res:Response){
        try{

        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async createProduct(req:Request,res:Response):Promise<void>{
        try{
            const added:IProduct|IProduct[]=await ProductService.createProduct(req.body)
            res.status(200).json({
                added
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async updateProduct(req:Request,res:Response){
        try{
            const id:string=req.params.id;
            const updated:IProduct=req.body;
            const updatedProduct:IProduct=await ProductService.updateProduct(id,updated);
            res.status(200).json({
                status:"success",
                updatedProduct
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    static async deleteProduct(req:Request,res:Response){
        try{
            const id=req.params.id
            const delet=await ProductService.deleteProduct(id)
            res.status(200).json({
                delet
            })            
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
}