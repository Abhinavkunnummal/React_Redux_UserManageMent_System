import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Model/UserModel.js';
import generateToken from '../Jwt/jwt.js';
import uploadImage from '../Cloudinary/cloudinary.js';
let profile_Url;


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hasHPassword = await bcrypt.hash(password, salt);
        return hasHPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

const signUp = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body;
   
        const Already  = await User.findOne({email});
        if(Already){
            return res.status(201).json({message:'Email already exist'})
        }
        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            profile_Url:null
        });

        const userData = await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const verifyLogin = async (req, res) => {
    const { email, password } = req.body;
    try {

        const userData = await User.findOne({ email });
        if (!userData) {
            console.log('Invalid email')
            return res.status(200).json({ success: false, message: 'Invalid email' })
        }

        const Matching = await bcrypt.compare(password, userData.password);

        if (!Matching) {
            return res.status(200).json({
                success: false,
                message: 'Invalid password'
            }); 
        }

        const token = generateToken(userData._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        })
    } catch (error) {
        res.status(500).json({ message: false, message: 'Server error' });
    }
}

const getUserData = async (req, res) => {
    try {
        console.log("1")
        const { payload } = req.user;
        const user = await User.findOne({ _id: payload });
        console.log(user)
        if (user) {
            res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    profile_Url:user.profile_Url
                }
            })
        } else {
            console.log('no user')
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}

const editProfile = async(req,res) =>{
    try {
     
        const { name,email,mobile } = req.body;

        const {payload} = req.user;

        let profile_Url;
        console.log('start')
        if(req.file){
            profile_Url = await uploadImage(req.file.buffer)
        }
        console.log('finish')
        const updateUser = await User.findByIdAndUpdate(
            payload,
            {
                name,
                email,
                mobile,
                ...(profile_Url && { profile_Url })
            },
            {new:true}
        )
        console.log('3')
        console.log(updateUser,'user')
        if(updateUser){
            res.status(200).json({
                success:true,
                message:'Profile updated successfully',
                user:updateUser
            })
        }else{
           
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
    signUp,
    verifyLogin,
    getUserData,
    editProfile
}