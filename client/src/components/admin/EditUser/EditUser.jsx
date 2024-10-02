import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css';
import profile from '../../../assets/profile.png';
import API from '../../../../config/axiosConfig';
import { toast } from 'react-toastify';

const EditUser = () => {

    const {userId} = useParams()
    const [profilePic, setProfilePic] = useState(profile);
    const [email,setEmail] = useState('')
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const navigate = useNavigate();

      useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('adminToken');
            try {
                const response = await API.get(`/admin/edituser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                if (response.data.success) {
                    setName(response.data.user.name);
                    setMobile(response.data.user.mobile);
                    setEmail(response.data.user.email)
                } else {
                    // navigate('/admin/login');
                }
            } catch (error) {
                // navigate('/admin/login');
            }
        };
        fetchUserDetails();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'mobile') {
            setMobile(value);
        }
    };

    const handleProfilePicChange = (event) => {
        setProfilePic(event.target.files[0]);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('mobile', mobile);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }

        try {
            const response = await API.put(`/admin/edituser/${userId}`,formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success('Profile Updated');
                navigate('/admin/dashboard');
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='user-edit-container'>
            <div className="user-profile-section">
                <div className="user-profile-info">
                    <p>Edit Profile</p>
                    <img src={profilePic instanceof File ? URL.createObjectURL(profilePic) : profilePic} alt="Profile" className="user-profile-pic" />
                </div>
                <div className="user-form-section">
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
                        Email:
                        <input
                            type="text"
                            name='email'
                            value={email}
                            readOnly
                        />
                    </label>
                    <label>
                        Mobile:
                        <input
                            type="text"
                            name='mobile'
                            value={mobile}
                            onChange={handleInputChange}
                        />
                    </label>
                    <input type="file" onChange={handleProfilePicChange} id="upload" hidden />
                    <label className='user-upload-btn' htmlFor="upload">Upload</label>
                    <button onClick={handleSaveChanges} className="user-save-btn">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
