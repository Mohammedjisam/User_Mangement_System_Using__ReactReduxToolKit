import React, { useState } from 'react';
import axios from 'axios';
import './UserSignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles


const UserSignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setProfileImage] = useState(null);


    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

        
    const validateForm = () => {
      const newErrors = {};
  
      // Trim whitespace from inputs except for image
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPhone = phone.trim();
      // Do not trim image
  
      // Validate name: only letters are allowed (both lowercase and uppercase)
      if (!trimmedName) {
          newErrors.name = "Name is required.";
      } else if (!/^[A-Za-z]+$/.test(trimmedName)) {
          newErrors.name = "Name can only contain letters.";
      }
  
      // Validate email: must end with @gmail.com and follow standard email structure
      if (!trimmedEmail) {
          newErrors.email = "Email is required.";
      } else if (!/^[\w-.]+@gmail\.com$/.test(trimmedEmail)) {
          newErrors.email = "Email must be a valid Gmail address.";
      }
  
      // Validate phone number: must be exactly 10 digits
      if (!trimmedPhone) {
          newErrors.phone = "Phone number is required.";
      } else if (!/^\d{10}$/.test(trimmedPhone)) {
          newErrors.phone = "Phone number must be exactly 10 digits.";
      }
  
      // Validate image: required field (no trimming)
      if (!image) {
          newErrors.image = "Profile image is required.";
      }
  
      return newErrors;
  };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

         try{
          const response =await axios.post("http://localhost:3000/user/create",{name,email,phone,password,image},{ headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          }})
          alert(response.data.message);
          console.log(response.data)
           navigate("/login");
        }catch(err){
          // Show error toast for server errors
          toast.error(err.response?.data?.message || 'Something went wrong');
        }
      
      };

    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                 {errors.name && <span className="error">{errors.name}</span>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                  {errors.email && <span className="error">{errors.email}</span>}

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                 {errors.phone && <span className="error">{errors.phone}</span>}
                
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <span className="error">{errors.password}</span>}


                <label htmlFor="profileImage">Profile Image</label>
                <input
                type="file"
                name="profileImage"
                onChange={(e) => setProfileImage(e.target.files[0])} // Handle image file input
                 />
                {errors.image && <span className="error">{errors.image}</span>}

                <button type="submit" className="submit-btn">Sign up</button>

                <p className="signin-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
            <ToastContainer /> {/* Toast container for notifications */}
            </div>
    );
};

export default UserSignUp;
