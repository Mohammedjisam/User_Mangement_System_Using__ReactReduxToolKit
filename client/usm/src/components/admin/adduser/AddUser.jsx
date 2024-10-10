import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddUser.css"

const AddUser = () => {
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phone,setPhone]=useState('')
  const [image, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state


      
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

    try {
      const response = await axios.post('http://localhost:3000/admin/create',{name,image, email,phone,password },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Ensure cookies with the token are sent
        }
      );
      console.log(response.data);

      setSuccessMessage('User registered successfully!');
      setErrors({}); // Clear any previous errors
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.log(err);
    }
  };

  return (
      
      <div className="adduser-register-container">
        <form className="adduser-register-form" onSubmit={handleSubmit}>
          <h2>Add New User</h2>
          
          {successMessage && (
            <div className="success-alert">
              {successMessage}
            </div>
          )}


          <div className="adduser-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              onChange={(e) => setname(e.target.value)}
            />
              {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="adduser-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
             {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="adduser-form-group">
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
                   
          </div>
         

          <div className="adduser-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
             {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="adduser-form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
             {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <button type="submit" className="adduser-register-btn">
            Register
          </button>

          <p className="adduser-login-prompt">
          Go back to <a href="/dashboard"> Dashboard?</a>
          </p>
        </form>
      </div>

  );
};

export default AddUser;
