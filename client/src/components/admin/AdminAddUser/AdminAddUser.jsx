import React, { useState } from 'react';
import './AdminAddUser.css';
import { useNavigate } from 'react-router-dom';
import API from '../../../../config/axiosConfig';

const AdminAddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = { name, email, password, mobile };

    try {
        console.log(formData,'formdata')
      const token = localStorage.getItem('adminToken')
      const response = await API.post('/admin/adduser', formData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      console.log(response,'reponse')
      if (response.data.message === 'Email already exist') {
        newErrors.email = 'Email already exist';
        setErrors(newErrors);
        return;
      }
      if (response.status === 200 || response.status === 201) {
        navigate('/admin/dashboard');
      } else {
        setErrors({ apiError: 'User addition failed' });
      }
    } catch (error) {
      setErrors({ apiError: 'User addition failed' });
    }
  };

  return (
    <div className="admin-container d-flex flex-column align-items-center mt-3">
      <form className="admin-form mt-2" onSubmit={handleSubmit}>
        <h1 className="admin-heading">Add New User</h1>

        <div className="admin-input-container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="admin-error-text">{errors.name}</p>}
        </div>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="admin-error-text">{errors.email}</p>}

        <input
          type="text"
          id="mobile"
          name="mobile"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {errors.mobile && <p className="admin-error-text">{errors.mobile}</p>}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="admin-error-text">{errors.password}</p>}

       

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminAddUser;
