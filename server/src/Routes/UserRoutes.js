import express from 'express';
import upload from '../Cloudinary/multer.js'
import { userAuth,isValidUser } from '../Middleware/userAuth.js';

const user_route=express.Router();

import { signUp ,verifyLogin,getUserData,editProfile } from '../Controllers/UserController.js';
console.log('hello')
user_route.post('/signup',signUp);
user_route.post('/login',verifyLogin);
user_route.get('/',userAuth,isValidUser,getUserData);
user_route.put('/edit-profile',userAuth,isValidUser,upload.single('profilePic'),editProfile);



export default user_route;