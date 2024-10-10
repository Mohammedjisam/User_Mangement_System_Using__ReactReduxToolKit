import React, { useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from '../../../redux/AdminSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const user = useSelector((state) => state.admin.admin);
    console.log("Redux Admin State:", user);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/admin/login", { email, password }, { withCredentials: true });
    
        if (response.data && response.data.name) {
          dispatch(addAdmin(response.data)); // Dispatch admin data to redux store
          
          alert(`Hello ${response.data.name}, you are successfully logged in!`);
          
          // Delay navigation slightly to ensure Redux is updated before redirect
          setTimeout(() => {
            navigate("/adminhome"); // Navigate to admin home page
          }, 1); // 
        } else {
          toast.error('Login failed: Invalid Credentials');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Invalid credentials, please try again';
        toast.error(errorMessage);
      }
    };
  
    return (
      <div className="unique-admin-login-container">
          <ToastContainer 
              position="top-right" 
              autoClose={3000} 
              hideProgressBar={false} 
              newestOnTop={false} 
              closeOnClick 
              rtl={false} 
              pauseOnFocusLoss 
              draggable 
              pauseOnHover 
              theme="colored"
          />
        <div className="unique-admin-login-left">
          <h1>Admin Portal</h1>
          <p>Login to manage your dashboard</p>
        </div>
  
        <div className="unique-admin-login-right">
          <form className="unique-login-form" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className="unique-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="unique-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button type="submit" className="unique-login-btn">Login</button>
          </form>
        </div>
      </div>
    );
};

export default AdminLogin;
