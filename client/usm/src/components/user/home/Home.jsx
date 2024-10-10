import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutUser } from '../../../redux/UserSlice';
import Alert from '../../alert/Alert';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // For logout confirmation
  const [showUpdateAlert, setShowUpdateAlert] = useState(false); // For update confirmation
  const homeUser = useSelector(state => state.user.users);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${homeUser.id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setImage(res.data.profileImage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [homeUser.id]); // Add dependency to run effect when homeUser.id changes

  // Handle logout confirmation
  const handleLogout = () => {
    setShowLogoutAlert(true); // Show logout confirmation alert
  };

  const userLogout = async () => {
    await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
    dispatch(logoutUser());
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false); // Cancel the logout and hide alert
  };

  const handleUpdate = () => {
    setShowUpdateAlert(true); // Show update confirmation alert
  };

  const confirmUpdate = () => {
    // Navigate to the update component after confirmation
    navigate("/update");
    setShowUpdateAlert(false); // Hide the confirmation alert
  };

  const cancelUpdate = () => {
    setShowUpdateAlert(false); // Cancel the update and hide alert
  };
  return (
    <div className="dashboard-container">
      <div className="profile-card">
        <h2>User Home</h2>
        <img src={`http://localhost:3000${image}`} alt="Profile" className="profile-img" />

        <div className="user-details">
          <h2>{name}</h2>
          <h3>{email}</h3>
          <h3>{phone}</h3>
        </div>
        <button className="update-btn" onClick={handleUpdate}>Update</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      {showLogoutAlert && (
        <Alert
          message="Are you sure you want to logout?"
          onConfirm={userLogout}
          onCancel={cancelLogout}
        />
      )}
       {showUpdateAlert && (
        <Alert
          message="Are you sure you want to update your data?"
          onConfirm={confirmUpdate}
          onCancel={cancelUpdate}
        />
      )}
    </div>
  );
};

export default Home;
