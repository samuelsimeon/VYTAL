// src/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"; // Animation from lottie
import ProgressChart from "./components/ProgressChart"; // progress bar from chart js
import BodyMetricsChart from "./components/BodyMetricsChart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import "./Sidebar.css";
import "./components/BodyMetricsChart.css";

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

import sneakerIcon from "/icons/sneaker.png";
import calculatorIcon from "/icons/calculator.png";
import meatIcon from "/icons/meat.png";
import dropsIcon from "/icons/drops.png";

function Dashboard({ username = "User", onLogout }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
            <img src={dashboardIcon} alt="Dashboard" /> Dashboard
          </Link>
          <Link to="/workoutdictionary" className="sidebar-link">
            <img src={dictionaryIcon} alt="Dictionary" /> Dictionary
          </Link>
          <Link to="/logworkouts" className="sidebar-link">
            <img src={logWorkoutIcon} alt="Log Workouts" /> Log Workouts
          </Link>
          <Link to="/logmeals" className="sidebar-link">
            <img src={logMealIcon} alt="Log Meals" /> Log Meals
          </Link>

          <div className="sidebar-label">ACCOUNT PAGES</div>
          <Link to="/profile" className="sidebar-link">
            <img src={profileIcon} alt="Profile" /> Profile
          </Link>
          <Link to="/settings" className="sidebar-link">
            <img src={settingsIcon} alt="Settings" /> Settings
          </Link>
          {/* Logout: call onLogout when clicked, then navigate to /login */}
          <Link to="/login" className="sidebar-link" onClick={onLogout}>
            <img src={logoutIcon} alt="Logout" /> Logout
          </Link>
        </nav>

        <div className="sidebar-help">
          <img src="/icons/help.png" alt="Help" />
          <p>
            Need help? <br /> Please contact us
          </p>
          <button className="contact-btn">CONTACT US</button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Top Header */}
        <div className="dashboard-header">
          <div className="dashboard-user-info">
            <h2>Dashboard</h2>
          </div>
          <div className="dashboard-date">{selectedDate.toDateString()}</div>
        </div>

        {/* Top Stats */}
        <div className="dashboard-top-stats">
          <div className="stat-card">
            <div className="stat-text">
              <p className="stat-label">Steps</p>
              <p className="stat-value">$53,000 <span className="stat-change positive">+2000</span></p>
            </div>
            <div className="stat-icon">
              <img src={sneakerIcon} alt="Steps" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-text">
              <p className="stat-label">Calories</p>
              <p className="stat-value">2,300 <span className="stat-change positive">+500</span></p>
            </div>
            <div className="stat-icon">
              <img src={calculatorIcon} alt="Calories" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-text">
              <p className="stat-label">Protein</p>
              <p className="stat-value">+3,052 <span className="stat-change negative">-1050</span></p>
            </div>
            <div className="stat-icon">
              <img src={meatIcon} alt="Protein" />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-text">
              <p className="stat-label">Water</p>
              <p className="stat-value">$173,000 <span className="stat-change positive">+800</span></p>
            </div>
            <div className="stat-icon">
              <img src={dropsIcon} alt="Water" />
            </div>
          </div>
        </div>

        {/* Middle Widgets Row */}
        <div className="dashboard-widgets-row">
          {/* Greeting Widget */}
          <div className="widget-large greeting-widget">
            {/* Text side */}
            <div className="greeting-text">
              <p>Welcome back,</p>
              <h3>{username}</h3>
              <p className="sub">
                Glad to see you!
                <br />
                Ready to Lock in?
              </p>
              <Link to="/logworkouts" className="log-btn">
                Click to Log workouts →
              </Link>
            </div>
            {/* Image side */}
            <div className="greeting-image-side"></div>
          </div>

          {/* Additional widgets (Goal Widget, Streak Widget, etc.) can be placed here */}
          <div className="widget-small goal-widget">
            <h4>Calories / Protein Goal</h4>
            <div className="goal-ring-container">
              <svg viewBox="0 0 36 36" className="goal-ring">
                <path
                  className="ring-bg"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="ring-progress"
                  strokeDasharray="95, 100"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="ring-icon">
                <img src="/icons/calculator.png" alt="Progress Icon" />
              </div>
              <div className="ring-labels">
                <span className="percent-left">0%</span>
                <div className="ring-percent">
                  <strong>95%</strong>
                  <p>Almost there!!</p>
                </div>
                <span className="percent-right">100%</span>
              </div>
            </div>
          </div>

          <div className="widget-small streak-widget">
            <div className="streak-header">
              <h4>Streaks</h4>
              <div className="streak-options">•••</div>
            </div>
            <div className="streak-body">
              <div className="streak-center">
                <div className="leaf-badge">
                  <img src="/icons/leaf.png" alt="Laurel" className="streak-leaf" />
                  <span className="streak-days">3</span>
                </div>
                <p className="streak-label">Days</p>
                <div className="streak-quote-box">
                  <p>
                    First step is always <br /> the most important<br />
                    <span className="highlight">Keep it up. 👍</span>
                  </p>
                </div>
              </div>
              <div className="streak-fire">
                <DotLottieReact
                  src="https://lottie.host/8dfa88fe-0fe2-4c95-a3fb-72ee21b42ee2/p1azO6tCsp.lottie"
                  loop
                  autoplay
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="dashboard-charts-row">
          <div className="chart-card">
            <h4 className="chart-title">Progress overview</h4>
            <p className="chart-sub">
              <span className="highlight">(+5)</span> more in 2021
            </p>
            <ProgressChart />
          </div>
          <div className="chart-card body-metrics-widget">
            <div className="body-metrics-chart">
              <BodyMetricsChart />
            </div>
          </div>
        </div>

        {/* Logged Workouts & Gym Notes */}
        <div className="dashboard-bottom-section">
          <div className="dashboard-logged-workouts">
            <div className="logged-header">
              <div>
                <h4>Logged Workouts</h4>
                <p className="logged-sub">
                  <span className="check">✔</span> +30 done this month
                </p>
              </div>
              <div className="dashboard-date">
                {selectedDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <table className="logged-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Set x Rep</th>
                  <th>Duration</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Bench Press", rep: "4 X 12", duration: "3 (Min)", weight: "60 (kg)" },
                  { name: "Cable Lat Pulldowns", rep: "4 X 12", duration: "3 (Min)", weight: "10 (kg)" },
                  { name: "Incline Chest Press", rep: "4 X 12", duration: "3 (Min)", weight: "100 (lb)" },
                  { name: "Iso Lateral Back", rep: "4 X 12", duration: "3 (Min)", weight: "100 (kg)" },
                  { name: "Overhead Press", rep: "4 X 12", duration: "3 (Min)", weight: "25 (lb)" },
                  { name: "Pendlay Row", rep: "4 X 12", duration: "3 (Min)", weight: "40 (lb)" }
                ].map((w, i) => (
                  <tr key={i}>
                    <td>{w.name}</td>
                    <td><strong>{w.rep}</strong></td>
                    <td><strong>{w.duration}</strong></td>
                    <td><strong>{w.weight}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="gym-reminders-widget">
            <div className="reminder-header">
              <div>
                <h4>Gym Notes & Reminders</h4>
                <p className="reminder-sub">
                  <span className="check">✔</span> +30 this month
                </p>
              </div>
              <button className="reminder-add">+ Add</button>
            </div>
            <div className="reminder-list">
              {[
                { icon: "🔔", text: "Try new Exercises", time: "22 DEC 7:20 PM" },
                { icon: "🛡️", text: "Sign up for Saviour’s program", time: "21 DEC 11:21 PM" },
                { icon: "🛒", text: "Buy new gym gear", time: "21 DEC 9:28 PM" },
                { icon: "📄", text: "Renew Flyefit membership", time: "20 DEC 3:52 PM" },
                { icon: "💬", text: "Invite Jordan for a session", time: "19 DEC 11:35 PM" },
                { icon: "🎨", text: "Work on fitness channel", time: "18 DEC 4:41 PM" },
              ].map((note, idx) => (
                <div className="reminder-item" key={idx}>
                  <span className="reminder-icon">{note.icon}</span>
                  <div className="reminder-text">
                    <p className="reminder-title">{note.text}</p>
                    <p className="reminder-time">{note.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
