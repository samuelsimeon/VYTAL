import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WorkoutDictionary.css";
import "./Sidebar.css"; // Reuse your sidebar styles

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

// Muscle image
import MuscleMap from "/images/adobediagram.png";

const muscleData = {
  chest: {
    name: "Chest",
    exercises: ["Bench Press", "Push-Ups", "Chest Fly", "Incline Bench Press", "Dips", "Cable Fly"],
  },
  back: {
    name: "Back",
    exercises: ["Pull-Ups", "Deadlifts", "Bent-over Rows", "Lat Pulldown", "Face Pulls", "Seated Row"],
  },
  legs: {
    name: "Legs",
    exercises: ["Squats", "Leg Press", "Lunges", "Leg Curls", "Calf Raises", "Step-ups"],
  },
  arms: {
    name: "Arms",
    exercises: ["Bicep Curls", "Triceps Dips", "Hammer Curls", "Overhead Triceps Extension", "Preacher Curls", "Cable Curl"],
  },
  abs: {
    name: "Abs",
    exercises: ["Crunches", "Hanging Leg Raises", "Russian Twists", "Plank", "Ab Rollouts", "Bicycle Crunches"],
  },
};

function WorkoutDictionary() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscleData[muscle]);
  };

  const closePopup = () => {
    setSelectedMuscle(null);
  };

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
          <Link to="/settings" className="sidebar-link">
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

      {/* Main Content */}
      <main className="dashboard-main workout-dictionary-main">
        <h2>Interactive Muscle Map</h2>
        <p>Click on a muscle to see relevant exercises.</p>

        <div className="muscle-map-container">
          <img src={MuscleMap} alt="Muscle Map" className="muscle-map" />

          {/* Clickable Areas */}
          <div className="muscle-area chest" onClick={() => handleMuscleClick("chest")} />
          <div className="muscle-area back" onClick={() => handleMuscleClick("back")} />
          <div className="muscle-area legs" onClick={() => handleMuscleClick("legs")} />
          <div className="muscle-area arms" onClick={() => handleMuscleClick("arms")} />
          <div className="muscle-area abs" onClick={() => handleMuscleClick("abs")} />
        </div>

        {/* Pop-up for Exercises */}
        {selectedMuscle && (
          <div className="exercise-popup">
            <div className="popup-header">
              <h3>{selectedMuscle.name}</h3>
              <button className="close-btn" onClick={closePopup}>
                &times;
              </button>
            </div>

            <div className="exercise-grid">
              {selectedMuscle.exercises.map((exercise, index) => (
                <div key={index} className="exercise-box">
                  {exercise}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default WorkoutDictionary;
