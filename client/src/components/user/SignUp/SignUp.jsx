import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import API from '../../../../config/axiosConfig'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required'
    }

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!mobile) {
      newErrors.mobile = 'mobile number is required';
    }

    if (newErrors.name || newErrors.email || newErrors.password || newErrors.mobile) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // console.log(name, email, password, mobile, 'hello')
    let formData = {name,email,password,mobile}
    // console.log(formData,'formdata')

    try {
      const response = await API.post('/signup',formData)
      // console.log(response.status,'status')
      // console.log(response.data.message,'status')
      if(response.data.message === 'Email already exist'){
        newErrors.email = 'Email already exist'
        setErrors(newErrors)
        return
      }
      if (response.status === 200 || response.status === 201) {
        navigate('/login');
      } else {
        setErrors({ apiError: 'SignUp Failed' })
      }
    } catch (error) {
      setErrors({ apiError: 'SignUp failed' })
    }

  };

  return (
    <div>
      <div className="container d-flex flex-column align-items-center mt-3">
        <form className="mt-2" onSubmit={handleSubmit}>
          <h1 className="heading">Sign Up</h1>

          <div className="input-container">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="number"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <p className="error-text">{errors.mobile}</p>}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}



          <button type="submit">Sign Up</button>
          <p className="footer">
            Already have an account? <span className="signup" onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
