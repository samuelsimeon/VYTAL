import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Sidebar.css";
import "./logMeals.css";

// ICONS
import dashboardIcon from "/icons/dashboard.png";
import dictionaryIcon from "/icons/search.png";
import logWorkoutIcon from "/icons/barbell.png";
import logMealIcon from "/icons/cutlery.png";
import settingsIcon from "/icons/setting.png";
import profileIcon from "/icons/user.png";
import logoutIcon from "/icons/logout.png";

function LogMeals() {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealLog, setMealLog] = useState({});

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/meals`, {
        const res = await fetch("http://localhost:3009/api/meals", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch meals");

        const mealsArray = await res.json();
        const groupedMeals = {};
        mealsArray.forEach((meal) => {
          if (!groupedMeals[meal.date]) groupedMeals[meal.date] = [];
          groupedMeals[meal.date].push(meal);
        });

        setMealLog(groupedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName || !calories) {
      alert("Please fill in all fields.");
      return;
    }
    if (Number(calories) <= 0) {
      alert("Calories must be a positive number.");
      return;
    }

    const dateKey = formatDate(selectedDate);
    const newMeal = { mealName, calories: Number(calories), date: dateKey };

    try {
      const response = await fetch("http://localhost:3009/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newMeal),
      });

      if (!response.ok) throw new Error("Failed to save meal");

      const savedMeal = await response.json();

      setMealLog((prevLog) => ({
        ...prevLog,
        [dateKey]: prevLog[dateKey]
          ? [...prevLog[dateKey], savedMeal]
          : [savedMeal],
      }));

      setMealName("");
      setCalories("");
    } catch (error) {
      console.error(error);
      alert("Error saving meal");
    }
  };

  const mealsForSelectedDate = mealLog[formatDate(selectedDate)] || [];

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
      <main className="dashboard-main log-meals-main">
        <h2>Log Your Meals</h2>
        <p>Track your daily nutrition to optimize your fitness goals.</p>

        <div className="calendar-container">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>


        <form onSubmit={handleSubmit} className="meal-form">
          <input
            type="text"
            placeholder="Enter meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <button type="submit">Log Meal</button>
        </form>

          <h3>Meals on {formatDate(selectedDate)}</h3>
          {mealsForSelectedDate.length > 0 ? (
            <ul>
              {mealsForSelectedDate.map((meal) => (
                <li key={meal._id}>
                  <strong>{meal.mealName}</strong> – {meal.calories} cal
                </li>
              ))}
            </ul>
          ) : (
            <p>No meals logged for this day.</p>
            )}
      </main>
    </div>
  );
}

export default LogMeals;
