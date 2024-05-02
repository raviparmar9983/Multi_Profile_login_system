import dotenv from 'dotenv'
import express,{ Express,Request,Response  } from "express";
dotenv.config({path:'./src/config.env'})
import userRouter from './routes/userRoutes'
import profileRouter from './routes/profileRoute';
const app:Express=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use('/user',userRouter)
app.use('/user',profileRouter)


export default app;
