import React, { useState } from 'react';
import './AdminHome.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../redux/AdminSlice';
import Alert from '../../alert/Alert'; // Import the custom Alert component

const AdminHome = () => {
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowAlert(true); // Show the alert when logout button is clicked
  };

  const handleConfirmLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
    setShowAlert(false); // Hide the alert after logout
  };

  const handleCancelLogout = () => {
    setShowAlert(false); // Hide the alert if user cancels
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const user = useSelector((state) => state.admin.admin);
  console.log("Checking the redux state @AdminHOME", user); // Checking the state

  return (
    <div className="admin-home-container">
      {showAlert && (
        <Alert
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
      <div className="admin-home-left">
        <h1>Admin Dashboard</h1>
        <p>Welcome to your dashboard. Manage your tasks and view statistics here.</p>
      </div>

      <div className="admin-home-right">
        <div className="admin-info">
          <h2>Admin Info</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Designation:</strong> Admin</p>
          <div className="admin-home-buttons">
            <button onClick={goToDashboard} className="dashboard-btn">Dashboard</button>
            <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
