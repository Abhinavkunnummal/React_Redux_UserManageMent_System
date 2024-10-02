import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AdminLogin.css';
import API from '../../../../config/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminLoginSuccess } from '../../../redux/adminAuthSlice.js';

const AdminLogin = () => {
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

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const formData = { email, password };
    console.log(formData,'formData')
    try {
      const response = await API.post('/admin/login', formData);
      if (response.data.message === 'Invalid email') {
        newErrors.email = 'Invalid email';
      } else if (response.data.message === 'Invalid password') {
        newErrors.password = 'Invalid password';
      }

      if (newErrors.email || newErrors.password) {
        setErrors(newErrors);
        return;
      }

      if (response.data.success) {
        console.log(response.data.token,'token')
        dispatch(adminLoginSuccess({
          token: response.data.token,
          admin:response.data.admin
        }));
        toast.success("Admin Login Successful");
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-container d-flex flex-column align-items-center mt-3">
      <form className="admin-form mt-2" onSubmit={handleSubmit}>
        <h1 className="admin-heading">Admin Sign In</h1>

        <div className="admin-input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="admin-error-text">{errors.email}</p>}
        </div>

        <div className="admin-input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="admin-error-text">{errors.password}</p>}
        </div>

        <button className="admin-submit-button" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
