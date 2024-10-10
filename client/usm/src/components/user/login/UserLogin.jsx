import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../../../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/user/login", {
                email,
                password
            }, { withCredentials: true });

            // Use standard alert for successful login
            window.alert("User logged in successfully!");

            // Dispatch the user data to the Redux store
            dispatch(addUser(response.data));

            // Navigate to the home page after a brief delay
            setTimeout(() => {
                navigate("/home");
            }, 2000);

        } catch (err) {
            // Show error toast
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label><br />
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-btn">
                    Login
                </button>

                <p className="signup-prompt">
                    Don't have an account? <Link to="/">Sign-Up</Link>
                </p>
            </form>

            <ToastContainer /> {/* Toast container for error messages */}
        </div>
    );
};

export default UserLogin;
