import User from '../Model/UserModel.js'
import generateToken from '../Jwt/jwt.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { response } from 'express';


dotenv.config();

const verifyLogin = async(req,res) =>{
    try {
     
        const adminEMAIL = process.env.ADMIN_EMAIL;
        const adminPASSWORD = process.env.ADMIN_PASSWORD;

        const { email,password } = req.body;
        if(email === adminEMAIL){
            if(password === adminPASSWORD){
                const token = generateToken(adminEMAIL);

                res.status(200).json({
                    success:true,
                    message:'Successfully Logged In',
                    token:token
                })
            }else{
                res.status(200).json({
                    success:false,
                    message:'Invalid password'
                })
            }
            
        }else{
            res.status(200).json({
                success:false,
                message:'Invalid email'
            })
        }
    } catch (error) {
        res.status(500).json({success:false,message:'Server error'});
    }
}

const getUserDetails = async(req,res) =>{
    try {
        const user = await User.find();
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error while fetching user details',
            error:error.message
        });
    }
}

const hashPassword = async(password) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

const addUser = async(req,res) =>{
    try {
        console.log('sdfsdhello')
        const { name,email,mobile,password } = req.body;

        // if(!name || !email || !mobile || !password ) {
        //     return res.status(400).json({success:false,message:'All fields are required'});
        // }
     
        const activeUser = await User.findOne({email});
     
        if(activeUser){
            return res.status(200).json({success:true,message:'Email already exist'});
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            mobile,
            password:hashedPassword
        });

        const userData = await user.save();

        res.status(201).json({
            success:true,
            message:'User registered successfully',
            user:{
                name:userData.name,
                email:userData.email,
                mobile:userData.mobile
            }
        })
    } catch (error) {
        res.status(500).json({success:false,message:'Server error'})
    }
}

const deleteUser = async(req,res) =>{
    try {
        console.log(req.params,'heello')
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({success:false,message:'UserId id required'});
        }

        const user = await User.findByIdAndDelete(userId);
        console.log(user)
        if(user){
            return res.json({success:true,message:'User deleted successfully'});
        }
 
        
    } catch (error) {
        res.status(500).json({success:false,message:'Interval server error'});
    }
}

const getEditUser = async(req,res) =>{
 
    try {
  
        const {userId} = req.params;
        const user = await User.findById(userId);
        console.log(user.email)
        if(!user){
            return res.status(404).json({success:false,message:'User is not found'})
        }

        res.status(200).json({
            success:true,
            user:{
                name:user.name,
                email:user.email,
                mobile:user.mobile
            }
        })
    } catch (error) {
        
    }
}

const editUser = async(req,res) =>{
    try {
        const {name,email,mobile} = req.body;
        const {userId} = req.params;

        // const existingEmailUser = await User.findOne({email});
        // if(existingEmailUser&&existingEmailUser._id.toString()!==userId){
        //     return res.json({
        //         success:false,
        //         message:'Email already used'
        //     })
        // }
        console.log('hey')
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                mobile
            },
            {new:true}
        )   
        if(updatedUser){
            return res.status(200).json({
                success:true,
                message:'Profile Updated'
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

export {
    verifyLogin,
    getEditUser,
    addUser,
    deleteUser,
    editUser,
    getUserDetails
}