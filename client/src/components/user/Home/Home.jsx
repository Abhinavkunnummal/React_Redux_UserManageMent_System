import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/userAuthSlice.js';
import './Home.css';
import { toast } from 'react-toastify';
import profile from '../../../assets/profile.png';
import API from '../../../../config/axiosConfig'
import 'react-toastify/dist/ReactToastify.css';



const Home = () => {

    // console.log('heli')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [profile_Url,setProfile_Url] = useState(profile)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const token = localStorage.getItem('userToken');

        const fetchUserInfo = async() =>{
            try {
                const response = await API.get('/',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.data.success){
                    // console.log(response.data.user,'response data')
                    setName(response.data.user.name)
                    setEmail(response.data.user.email)
                    setMobile(response.data.user.mobile)
                    setProfile_Url(response.data.user.profile_Url)
                    navigate('/')
                }
                else{
                    toast.error('Failed to fetch user data')
                }

                if(response.data.message=='No User'){
                    console.log('No User')
                }
            } catch (error) {
                console.log(error.response.data)
                if(error.response.data.message === 'User not found'){
                    navigate('/login')
                }
            }
        }
        fetchUserInfo();
    },[])

    const handleLogout = () => {

        dispatch(logout(
            {isLoggedIn :false}
        ))

        navigate('/login');
    };

    const handleEditProfile = () => {

        navigate('/edit-profile');
    };
    // console.log(profile_Url,'prfile')
    return (
        <div className='parent-container'>
            <div className="dashboard-container">
                <div className="profile-section">
                    <img src={profile_Url||profile} alt="Profile" className="profile-pic" />
                    <div className="profile-info">
                        <p>Welcome {name}</p>
                        <h2><span>Email</span>: {email}</h2>
                        <h3> <span>Mobile</span>:{mobile} </h3>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={handleEditProfile} className="edit-button">Edit Profile</button>
                    <button onClick={handleLogout} className="logouts-button">Logout</button>
                </div>
            </div>
        </div>

    );
}

export default Home
