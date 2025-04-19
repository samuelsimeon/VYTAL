import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "./Profile.css";

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfile(user);
      setFormData({ username: user.username, email: user.email, password: "" });
    }
    setLoading(false);
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update/${profile._id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Profile update failed");
      } else {
        setProfile(data.user);
        setUser(data.user);
        setMessage("Profile updated successfully.");
        setEditMode(false);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="custom-sidebar">
        <div className="sidebar-logo">
          <Link to="/dashboard" className="sidebar-h2-link"><h2>Vytal</h2></Link>
        </div>

        <nav className="sidebar-links">
          <Link to="/dashboard" className="sidebar-link"><img src={dashboardIcon} alt="" /> Dashboard</Link>
          <Link to="/workoutdictionary" className="sidebar-link"><img src={dictionaryIcon} alt="" /> Dictionary</Link>
          <Link to="/logworkouts" className="sidebar-link"><img src={logWorkoutIcon} alt="" /> Log Workouts</Link>
          <Link to="/logmeals" className="sidebar-link"><img src={logMealIcon} alt="" /> Log Meals</Link>

          <div className="sidebar-label">ACCOUNT PAGES</div>
          <Link to="/profile" className="sidebar-link"><img src={profileIcon} alt="" /> Profile</Link>
          <Link to="/settings" className="sidebar-link"><img src={settingsIcon} alt="" /> Settings</Link>
          <Link to="/" className="sidebar-link"><img src={logoutIcon} alt="" /> Logout</Link>
        </nav>

        <div className="sidebar-help">
          <img src="/icons/help.png" alt="Help" />
          <p>Need help? <br /> Please contact us</p>
          <button className="contact-btn">CONTACT US</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main profile-main">
          <div className="profile-container">
            {!editMode ? (
            <div className="profile-info">
              <div className="profile-avatar">
                <img src="/icons/profile.png" alt="Avatar" />
              </div>
              <h3>Your Profile</h3>
              <div className="profile-detail-box">Username: {profile?.username}</div>
              <div className="profile-detail-box">Email: {profile?.email}</div>
            <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
          </div>
          
          ) : (
            <form onSubmit={handleUpdate} className="profile-form">
              <h3 className="form-heading">Update Profile</h3>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New password"
              />

              <div className="profile-btn-row">
                <button type="submit" className="btn primary-btn">Update Profile</button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>

          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
