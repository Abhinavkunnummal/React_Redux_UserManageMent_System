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

app.use('*', cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use('/',userRouter);
app.use('/admin',adminRouter)


app.listen(4000,()=>{
    console.log("Server is Listening")
})