// src/ParentComponent.jsx
import React, { useState, useEffect } from "react";
import VytalLoader from "./VytalLoader";
import AppContent from "./AppContent"; // Your main app content component (e.g., routes, dashboard, etc.)

function ParentComponent() {
  // Initially, we display the loader
  const [showLoader, setShowLoader] = useState(true);
  // This holds user data; in a real app, this might come from login, context, or localStorage
  const [loggedInUser, setLoggedInUser] = useState({ username: "" });

  // Simulate loading: After a few seconds, remove the loader
  useEffect(() => {
    // For demonstration, you might fetch the user data here from an API or from localStorage.
    // For now, assume we retrieved the following user:
    setLoggedInUser({ username: "Saviour" });
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // Adjust loader duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader ? (
        <VytalLoader onFinish={() => setShowLoader(false)} username={loggedInUser.username} />
      ) : (
        <AppContent setUser={setLoggedInUser} />  // This component contains your app's main content (e.g., routes)
      )}
    </div>
  );
}

export default ParentComponent;
