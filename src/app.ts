import dotenv from 'dotenv'
import express,{ Express,Request,Response  } from "express";
dotenv.config({path:'./src/config.env'})
import userRouter from './routes/userRoutes'
import profileRouter from './routes/profileRoute';
import produceRouter from './routes/productRoute'
import cartRouter from './routes/cartRoute'
const app:Express=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use('/user',userRouter)
app.use('/user/profile',profileRouter)
app.use('/user/profile/cart',cartRouter)
app.use('/admin',produceRouter);

export default app;
