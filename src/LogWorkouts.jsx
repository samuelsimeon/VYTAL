import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LogWorkouts.css";
import "./Sidebar.css";

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

function LogWorkouts() {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [workoutLog, setWorkoutLog] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:3009/api/logs", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch logs");

        const logsArray = await res.json();
        const groupedLogs = {};
        logsArray.forEach((log) => {
          if (!groupedLogs[log.date]) groupedLogs[log.date] = [];
          groupedLogs[log.date].push(log);
        });

        setWorkoutLog(groupedLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workoutName || !duration || !sets || !reps || weight === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (
      Number(duration) <= 0 ||
      Number(sets) <= 0 ||
      Number(reps) <= 0 ||
      Number(weight) < 0
    ) {
      alert("Values must be positive numbers or 0.");
      return;
    }

    const weightInKg =
      unit === "lb" ? (Number(weight) * 0.453592).toFixed(1) : Number(weight);
    const dateKey = formatDate(selectedDate);

    const newWorkout = {
      title: workoutName,
      date: dateKey,
      duration: Number(duration),
      sets: Number(sets),
      reps: Number(reps),
      weight: `${weightInKg} ${unit}`,
    };

    try {
      const response = await fetch("http://localhost:3009/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newWorkout),
      });

      if (!response.ok) throw new Error("Failed to save workout");
      const savedLog = await response.json();

      setWorkoutLog((prevLog) => ({
        ...prevLog,
        [dateKey]: prevLog[dateKey]
          ? [...prevLog[dateKey], savedLog]
          : [savedLog],
      }));

      setWorkoutName("");
      setDuration("");
      setSets("");
      setReps("");
      setWeight("");
    } catch (error) {
      console.error(error);
      alert("Error saving workout");
    }
  };

  const workoutsForSelectedDate = workoutLog[formatDate(selectedDate)] || [];

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
      <main className="dashboard-main log-workouts">
        <h2>Log Your Workouts</h2>

        <div className="calendar-container">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>


        <form onSubmit={handleSubmit} className="workout-form">
          <div className="form-group">
            <label htmlFor="workoutName">Workout Name</label>
            <input
              id="workoutName"
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Bench Press"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 30"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sets">Sets</label>
            <input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              placeholder="e.g., 3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reps">Reps</label>
            <input
              id="reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>

          <div className="form-group weight-group">
            <label htmlFor="weight">Weight</label>
            <div className="weight-input">
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 50"
              />
              <button
                type="button"
                className="unit-toggle"
                onClick={() => setUnit(unit === "kg" ? "lb" : "kg")}
              >
                {unit}
              </button>
              <div className="tooltip-container">
                <span className="question-mark">?</span>
                <span className="tooltip-text">
                  Input 0 if the exercise does not require weight.
                </span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn">
            Add Workout
          </button>
        </form>

        <h3>Workouts on {formatDate(selectedDate)}</h3>
        {workoutsForSelectedDate.length > 0 ? (
          <ul className="workout-list">
            {workoutsForSelectedDate.map((workout) => (
              <li key={workout._id}>
                <strong>{workout.title}</strong> – {workout.duration} min,
                {workout.sets} x {workout.reps} reps, {workout.weight}
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts logged for this day.</p>
        )}
      </main>
    </div>
  );
}

export default LogWorkouts;
