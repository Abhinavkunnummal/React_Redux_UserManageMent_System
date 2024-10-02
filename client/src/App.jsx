import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/user/Home/Home'
import Login from './components/user/Login/Login'
import SignUp from './components/user/SignUp/SignUp'
import EditProfile from './components/user/EditProfile/EditProfile'
import UserRouteProtector from './routeProtector/UserRouteProtector'
import UserLoginProtector from './routeProtector/UserLoginProtector'
import UserDetails from './components/admin/UserDetails/UserDetails'
import AdminLogin from './components/admin/adminLogin/AdminLogin'
import EditUser from './components/admin/EditUser/EditUser'
import AdminAddUser from './components/admin/AdminAddUser/AdminAddUser'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <div>
      {/* <ToastContainer theme='light'/> */}
      <Routes>
        <Route element={<UserRouteProtector  />}>
          <Route path='/' element={<Home />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>

        <Route element={<UserLoginProtector/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        <Route path='/admin/dashboard' element={<UserDetails/>} />
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/edituser/:userId' element={<EditUser/>}/>
        <Route path='/admin/add-user' element={<AdminAddUser/>}/>

      </Routes>
    </div>
  )
}

export default App
