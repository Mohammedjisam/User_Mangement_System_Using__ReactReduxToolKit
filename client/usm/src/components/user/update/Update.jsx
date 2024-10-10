import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for making API requests
import './Update.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/UserSlice';


const Update = () => {

    const navigate = useNavigate();
    const user=useSelector(state=>state.user.users)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setProfileImage] = useState(null); 
    const [errors, setErrors] = useState({});

    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // For success alert

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
  
      let id =user.id

      useEffect(() => {
        function fetchUser(){
          axios.get(`http://localhost:3000/user/${user.id}`).then((res)=>{
            setName(res.data.name)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setProfileImage(res.data.profileImage)
            console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
        }
        fetchUser()
      }, []);
        

       const handleUpdate=async(e)=>{
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        try{
          const response = await axios.put("http://localhost:3000/user/update",{ image, id, name, email,phone },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              withCredentials: true, // Ensure cookies are sent
            }
          )
          setShowSuccessAlert(true);

          console.log("this is the response from srver",response.data);
        //   dispatch(addUser(response.data.updatedUser))
        setTimeout(() => {
          navigate("/home");
      }, 2000); 
        }catch(err){
          console.log(err);
        }
       }

    return (
        <div className="update-container">
            <form className="update-form" onSubmit={handleUpdate}>
                <h2>Update Profile</h2>

                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
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
                   
                
                
                <label htmlFor="profileImage">Profile Image</label>
                <input
                type="file"
                name="profileImage"
               
                onChange={(e) => setProfileImage(e.target.files[0])} // Handle image file input
                />
                {errors.image && <span className="error">{errors.image}</span>}   

                <button type="submit" className="submit-btn">Update</button>
            </form>
            {showSuccessAlert && (
                <div className="success-alert">
                    Your data has been successfully updated!
                </div>
            )}
        </div>
    );
};

export default Update;
