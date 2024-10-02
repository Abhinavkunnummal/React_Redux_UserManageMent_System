// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import profile from '../../assets/profile.png'

// const Dashboard = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {

//         navigate('/login');
//     };

//     const handleEditProfile = () => {

//         navigate('/edit-profile');
//     };

//     return (
//         <div className='parent-container'>
//             <div className="dashboard-container">
//                 <div className="profile-section">
//                     <img src={profile} alt="Profile" className="profile-pic" />
//                     <div className="profile-info">
//                         <p>Welcome user</p>
//                         <h2><span>Email</span>: user@example.com</h2>
//                         <h3> <span>Mobile</span>:+1234567890 </h3>
//                     </div>
//                 </div>
//                 <div className="buttons">
//                     <button onClick={handleEditProfile} className="edit-button">Edit Profile</button>
//                     <button onClick={handleLogout} className="logout-button">Logout</button>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Dashboard;
