import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import './Login.css'
import API from '../../../../config/axiosConfig'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {loginSuccess} from '../../../redux/userAuthSlice.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    let formData = {email,password}
    try {
      const response = await API.post('/login',formData);
      if(response.data.message === 'Invalid email'){
        newErrors.email = 'Invalid email'
      }else if(response.data.message === 'Invalid password'){
        newErrors.password = 'Invalid password'
      }
      if(newErrors.email || newErrors.password){
        setErrors(newErrors)
        return
      }
      if(response.data.success){
        dispatch(loginSuccess({
          token : response.data.token,
          isLoggedIn : true
        }))
        toast.success("Login Successfull");
        // console.log('helo')
        navigate('/');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Error:',error)
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-3">
      <form className="mt-2" onSubmit={handleSubmit}>
        <h1 className="heading">Sign In</h1>

        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit">Sign In</button>
        <p className='footer'>
          New User? <span className='signup' onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
