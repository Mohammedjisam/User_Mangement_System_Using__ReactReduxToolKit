import React, { useEffect, useState } from 'react';
import './AdminDash.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../redux/AdminSlice';
import Alert from '../../alert/Alert';

const AdminDash = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]); // For storing search results
  const [user, setUsers] = useState([]); // For storing all users
  const [showAlert, setShowAlert] = useState(false); // Manage alert visibility for delete
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // For logout confirmation
  const [showEditAlert, setShowEditAlert] = useState(false); // For edit confirmation
  const [showAddAlert, setShowAddAlert] = useState(false); // For add user confirmation
  const [selectedUser, setSelectedUser] = useState(null); // Store the user to delete or edit
  const [selectedEditUser, setSelectedEditUser] = useState(null); // Store the user to edit
  const [hasSearched, setHasSearched] = useState(false); // To track if search has been performed
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Search function
  function searchUser() {
    setHasSearched(true); // Set the search flag to true when search is executed
    if (search.trim() === "") {
      setDisplay([]); // Clear results if search is empty
      return;
    }

    const searchQuery = search.trim().toLowerCase();

    const filteredUsers = user.filter((x) =>
      x.name.toLowerCase().includes(searchQuery) || 
      x.email.toLowerCase().includes(searchQuery) ||
      x.phone.includes(search.trim()) // Add phone number search
    );

    setDisplay(filteredUsers); 
  }

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3000/admin/data", { withCredentials: true })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log("error at axios fetch in getting user data @ admin dash", err);
        });
    }
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setSelectedEditUser(user);
    setShowEditAlert(true);
  };

  const confirmEdit = () => {
    if (selectedEditUser) {
      navigate(`/adminedit/${selectedEditUser._id}`);
    }
    setShowEditAlert(false);
  };

  const cancelEdit = () => {
    setShowEditAlert(false);
    setSelectedEditUser(null);
  };

  const handleDelete = async (user) => {
    setSelectedUser(user);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      const id = selectedUser._id;
      try {
        const response = await axios.delete(`http://localhost:3000/admin/delete/${id}`, {
          withCredentials: true,
        });
        console.log(response.data.message);
        setUsers(user.filter((u) => u._id !== id));
        setDisplay(display.filter((u) => u._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setSelectedUser(null);
  };

  // Show confirmation alert for logout
  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    await axios.post("http://localhost:3000/admin/logout", {}, { withCredentials: true });
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  // Show confirmation alert for adding a new user
  const handleAddNew = () => {
    setShowAddAlert(true);
  };

  const confirmAddUser = () => {
    navigate("/adminadd"); // Navigate to add new user page
    setShowAddAlert(false); // Hide the alert after confirmation
  };

  const cancelAddUser = () => {
    setShowAddAlert(false); // Hide the alert if admin cancels
  };

  // Handle navigation to admin home
  const navigateToAdminHome = () => {
    navigate("/adminhome");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={navigateToAdminHome} className="home-btn">Admin Home</button>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Just update the search state, no filtering here
            placeholder="Search users..."
            className="search-input"
          />
          <button onClick={searchUser} className="search-btn">Search</button> {/* Search only happens when button is clicked */}
          <div className="buttons">
            <button onClick={handleAddNew} className="add-new-btn">Add New</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {display.length > 0 ? (
              display.map((user, index) => (
                <tr key={index}>
                  <td>
                    {user.profileImage && (
                      <img src={`http://localhost:3000${user.profileImage}`} alt={`${user.name}'s profile`} className="profile-image" />
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(user)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : hasSearched && search.trim() !== "" ? ( // Show no user found message if search is not empty and has been searched
              <tr>
                <td colSpan="5" className="no-user-message">No user found.</td>
              </tr>
            ) : (
              user.map((user, index) => (
                <tr key={index}>
                  <td>
                    {user.profileImage && (
                      <img src={`http://localhost:3000${user.profileImage}`} alt={`${user.name}'s profile`} className="profile-image" />
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(user)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Show the custom alert box when deletion is triggered */}
      {showAlert && (
        <Alert
          message={`Are you sure you want to delete ${selectedUser.name}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {/* Show the custom alert box for edit confirmation */}
      {showEditAlert && (
        <Alert
          message={`Are you sure you want to edit ${selectedEditUser.name}?`}
          onConfirm={confirmEdit}
          onCancel={cancelEdit}
        />
      )}

      {/* Show alert for logout confirmation */}
      {showLogoutAlert && (
        <Alert
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      {/* Show alert for adding a new user */}
      {showAddAlert && (
        <Alert
          message="Are you sure you want to add a new user?"
          onConfirm={confirmAddUser}
          onCancel={cancelAddUser}
        />
      )}
    </div>
  );
};

export default AdminDash;
