

import { Request,Response } from "express";
import Cart, { ICart } from "../models/cartModel";
import { extendedRequest } from "../middlerware/authentication";
import CartService from "../services/CartService";

export default class CartController{

    // static async getAll(req:extendedRequest,res:Response):Promise<ICart>{
        
    // }
    static async addItemToCart(req:extendedRequest,res:Response):Promise<void>{
        try{
            const cart=await CartService.addTocart(req.profileId!,req.body.id,req.body.quantity);
            res.status(200).json({
                status:"success",
                cart
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }    
                        
}