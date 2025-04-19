// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Services from "./Services.jsx";
import Contact from "./Contact.jsx";
import LogWorkouts from "./LogWorkouts.jsx";
import LogMeals from "./LogMeals.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import WorkoutDictionary from "./WorkoutDictionary.jsx";
import Streaks from "./Streaks.jsx";
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";
import VytalLoader from "./components/VytalLoader.jsx"; // Loader component

function App() {
  // Initialize user state from localStorage so refreshes persist login info
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showLoader, setShowLoader] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  // When a user logs in, update state and save to localStorage, then trigger the loader.
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setShowLoader(true);
  };

  // Logout: call the logout API (if applicable), then clear state and localStorage.
  const handleLogout = async () => {
    try {
      await fetch("https://vytal-fitness-app-qq9j.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout API error:", err);
    }
    localStorage.removeItem("user");
    setUser(null);
    setShowLoader(false);
    setLoaderDone(false);
  };

  return (
    <Router>
      <MainContent
        user={user}
        onLogout={handleLogout}
        setUser={handleLogin}
        showLoader={showLoader}
        loaderDone={loaderDone}
        setLoaderDone={() => setLoaderDone(true)}
      />
    </Router>
  );
}

function MainContent({ user, onLogout, setUser, showLoader, loaderDone, setLoaderDone }) {
  const location = useLocation();
  // Define which routes should display the header (adjust if needed)
  const showHeaderRoutes = ["/"];

  return (
    <>
      {showHeaderRoutes.includes(location.pathname) && <Header user={user} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logworkouts" element={<LogWorkouts />} />
        <Route path="/logmeals" element={<LogMeals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              showLoader && !loaderDone ? (
                <VytalLoader onFinish={setLoaderDone} username={user.username} />
              ) : (
                // Pass onLogout to Dashboard so that its logout control can call it.
                <Dashboard username={user.username} onLogout={onLogout} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/workoutdictionary" element={<WorkoutDictionary />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} setUser={setUser} onLogout={onLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
      {!showHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
