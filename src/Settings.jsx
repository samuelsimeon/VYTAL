// src/Settings.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "./Settings.css"; // create this file

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

function Settings() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="custom-sidebar">
        <div className="sidebar-logo">
          <Link to="/dashboard" className="sidebar-h2-link">
            <h2>Vytal</h2>
          </Link>
        </div>

        <nav className="sidebar-links">
          <Link to="/dashboard" className="sidebar-link">
            <img src={dashboardIcon} alt="" /> Dashboard
          </Link>
          <Link to="/workoutdictionary" className="sidebar-link">
            <img src={dictionaryIcon} alt="" /> Dictionary
          </Link>
          <Link to="/logworkouts" className="sidebar-link">
            <img src={logWorkoutIcon} alt="" /> Log Workouts
          </Link>
          <Link to="/logmeals" className="sidebar-link">
            <img src={logMealIcon} alt="" /> Log Meals
          </Link>

          <div className="sidebar-label">ACCOUNT PAGES</div>
          <Link to="/profile" className="sidebar-link">
            <img src={profileIcon} alt="" /> Profile
          </Link>
          <Link to="/settings" className="sidebar-link active">
            <img src={settingsIcon} alt="" /> Settings
          </Link>
          <Link to="/" className="sidebar-link">
            <img src={logoutIcon} alt="" /> Logout
          </Link>
        </nav>

        <div className="sidebar-help">
          <img src="/icons/help.png" alt="Help" />
          <p>Need help? <br /> Please contact us</p>
          <button className="contact-btn">CONTACT US</button>
        </div>
      </aside>

      {/* Main Settings Content */}
      <main className="dashboard-main settings-main">
       
      </main>
    </div>
  );
}

export default Settings;
