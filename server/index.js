import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'

import adminRouter from './src/Routes/AdminRoutes.js'
import userRouter from './src/Routes/UserRoutes.js';
dotenv.config()


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));       

const app=express();

app.use(express.json());

app.use('*',cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/',userRouter);
app.use('/admin',adminRouter)


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(4000,()=>{
    console.log("Server is Listening")
})