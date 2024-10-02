import express from 'express';
import upload from '../Cloudinary/multer.js'


const admin_route = express.Router();

import {verifyLogin,getEditUser,addUser,deleteUser,editUser,getUserDetails} from '../Controllers/AdminController.js'
import adminAuth from '../Middleware/adminAuth.js';


admin_route.post('/login',verifyLogin);
// admin_route.get('/user-details',getUserDetails)
admin_route.post('/adduser',adminAuth,addUser)
admin_route.get('/user',adminAuth,getUserDetails)
admin_route.get('/edituser/:userId',adminAuth,getEditUser)
admin_route.put('/edituser/:userId',upload.single('profilePic'),editUser)
admin_route.delete('/delete-user/:userId',adminAuth,deleteUser)


export default admin_route;