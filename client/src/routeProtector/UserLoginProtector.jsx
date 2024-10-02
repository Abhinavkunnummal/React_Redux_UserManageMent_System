import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'



const UserLoginProtector = () => {

    const isLoggedIn = useSelector(state => state.userAuth.isLoggedIn);
    const navigate = useNavigate()
    useEffect(() => {
        const checkAuthStatus = async () => {
            if (isLoggedIn) {
                navigate('/')
            }
        }
        checkAuthStatus();
    }, [isLoggedIn, navigate])

    return !isLoggedIn ? <Outlet /> : null;
}

export default UserLoginProtector
