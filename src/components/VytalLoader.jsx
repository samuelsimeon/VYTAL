// src/VytalLoader.jsx
import React, { useEffect } from "react";
import "./VytalLoader.css"; // Ensure your CSS file defines styles for .loader, .fade-out, etc.

const VytalLoader = ({ onFinish, username }) => {
  useEffect(() => {
    const audio = document.getElementById("startup-sound");
    // Attempt to play the startup sound
    audio.play().catch((e) => {
      console.warn("Audio playback failed:", e);
    });

    // Start a timer to fade out the loader after 2700 ms
    const fadeOut = setTimeout(() => {
      document.querySelector(".loader").classList.add("fade-out");
      // Remove the loader after the fade-out animation (e.g., 500 ms)
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2700);

    return () => clearTimeout(fadeOut);
  }, [onFinish]);

  return (
    <>
      {/* Audio element for the startup sound */}
      <audio id="startup-sound" src="/videos/intro sound 1.mp3" preload="auto" />
      <div className="loader">
        <div className="box"></div>
        <div className="loader-text">
          <h1>Vytal</h1>
          <p>Hello {username || "User"}</p>
        </div>
      </div>
    </>
  );
};

export default VytalLoader;
