import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import Home from './components/user/Home/Home';
import Login from './components/user/Login/Login';
import SignUp from './components/user/SignUp/SignUp';
import EditProfile from './components/user/EditProfile/EditProfile';
import UserRouteProtector from './routeProtector/UserRouteProtector';
import UserLoginProtector from './routeProtector/UserLoginProtector';
import UserDetails from './components/admin/UserDetails/UserDetails';
import AdminLogin from './components/admin/adminLogin/AdminLogin';
import EditUser from './components/admin/EditUser/EditUser';
import AdminAddUser from './components/admin/AdminAddUser/AdminAddUser';
import Counter from './components/counter/Counter';

function App() {
  return (
    <div>
      <ToastContainer theme="light" position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        <Route element={<UserRouteProtector />}>
          <Route path='/' element={<Home />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>

        <Route element={<UserLoginProtector />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        <Route path='/admin/dashboard' element={<UserDetails />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/edituser/:userId' element={<EditUser />} />
        <Route path='/admin/add-user' element={<AdminAddUser />} />
        <Route path='/' element={<Counter />} />
      </Routes>
    </div>
  );
}

export default App;
