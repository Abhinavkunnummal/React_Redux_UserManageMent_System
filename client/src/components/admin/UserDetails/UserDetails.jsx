import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import API from '../../../../config/axiosConfig';
import { logout } from '../../../redux/adminAuthSlice';
import Modal from '../../modal/modal';
import profile from '../../../assets/profile.png'
import { toast } from 'react-toastify';

const UserDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [user,setuser] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('adminToken')
        if(token){
            const fetchUserInfo = async() =>{
                try {
                    const response = await API.get('/admin/user',{
                        headers:{
                            Authorization:`Bearer ${token}`
                        },
                        // params:{

                        // }
                    })

                    if(response.data.success){
                        setUsers(response.data.user)
                    }else{

                    }
                } catch (error) {
                    
                }
            }
            fetchUserInfo();
        }else{
            navigate('/admin/login')
        }
    },[navigate])






    const handleEditClick = (userId) => {
        console.log('UserId',userId)
        navigate(`/admin/edituser/${userId}`)
    };

    const handleDeleteClick = (user) => {
        setuser(user);
       setShowModal(true)
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const currentPage = 1; 
    const totalPages = 1;  
    const handlePageChange = (page) => {
       
    };


    const handleCloseModal = () => {
        setShowModal(false)
     };
    const handleConfirmDelete = async() => { 
        try {
            const token = localStorage.getItem('adminToken')
            const response = await API.delete(`/admin/delete-user/${user._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.data.success){  
                setUsers(users.filter(u => u._id !==user._id))
                toast.success('User deleted successfully')
            }else{
                toast.error('Failed to delete user')
            }            
        } catch (error) {
            toast.error('Error while deleting user')
        }
        console.log("Modal after clsoing")
        setShowModal(false)
    };

    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login')
     };

   
    const navigateToAddUser = () => {
        navigate('/admin/add-user')
     };

    return (
        <div className='dashboard'>
            <div className='top-bar'>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
            <div className='dcontainer'>
                <div className='header'>
                    <p>Manage Users</p>
                    <div>
                        <input
                            type="text"
                            placeholder='Search for users...'
                            className='search-bar'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button>Search</button>
                    </div>
                    <button className='adduser' onClick={navigateToAddUser}>Add user</button>
                </div>

                <div className="users-list">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td><img src={user.profile_Url||profile} alt="" className='profile' /></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(user._id)}>Edit</button>
                                            <button className='delete-btn' onClick={() => handleDeleteClick(user)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='no-users-found'>
                                    <td colSpan="5">No users found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                

            </div>

            {/* Modal Component */}
            {showModal && (
                <Modal
                    show={showModal}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    title="Delete User?"
                    body={`Are you sure you want to delete ${user?.name}?`}
                />
            )}
        </div>
    );
};

export default UserDetails;
