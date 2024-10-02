import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import profile from '../../../assets/profile.png';
import API from '../../../../config/axiosConfig'
import {toast} from 'react-toastify';


const EditProfile = () => {
    const [profilePic, setProfilePic] = useState(profile);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserDetails = async() =>{
            const token = localStorage.getItem('userToken');
            try {
                const response = await API.get('/',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.data.success){
                    console.log('helo')
                    console.log(response.data.user,'user')
                    setName(response.data.user.name)
                    setMobile(response.data.user.mobile)
                    
                    
                }else{
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        }
        fetchUserDetails();
    },[navigate])

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        if(name === 'name'){
            setName(value)
        }else if(name === 'mobile'){
            setMobile(value)
        }
        
    }

    const handleProfilePicChange = (event) => {
        setProfilePic(event.target.files[0]);
    };

    const handleSaveChanges = async(e) => {
        e.preventDefault();

        const token = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('mobile', mobile);
        if(profilePic){
            formData.append('profilePic',profilePic)
        }
        console.log(token,'token')
        try {
            const response = await API.put('/edit-profile',formData,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(response.data.success,'success')
            if(response.data.success){
                toast.success('Profile Updated')
                navigate('/');
            }else{
                toast.error('Failed to update profile')
            }
        } catch (error) {
            if(error.response.data.message === 'User not found'){
                toast.error('You are blocked')
                localStorage.removeItem('userToken')
                navigate('/login')
            }
        }
    };

    return (
        <div className='edit-profile-container'>
            <div className="profile-section">
                <div className="profile-info">
                    <p>Edit Profile</p>
                    <img src={profilePic || profile} alt="Profile" className="profile-pic" />

                </div>
                <div className="form-section">
                    <label>
                        Name:
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Mobile:
                        <input
                            type="text"
                            value={mobile}
                            name='mobile'
                            onChange={handleInputChange}
                        />
                    </label>
                    <input type="file" onChange={handleProfilePicChange} id="upload" hidden />
                    <label className='image' for="upload">Upload</label>
                    <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;