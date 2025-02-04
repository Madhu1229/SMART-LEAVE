import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import './LoginIcon.css';

export default function LogoutComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // Check if the user is logged in (token exists)
  const isLoggedIn = localStorage.getItem("token");

  function logout() {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Set logout message
    setMessage("Successfully Logged Out!");

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/");
    }, 300);
  }

  return (
    <div>
      {message && <p className="alert alert-success">{message}</p>}
      {/* Render the "Sign Out" button only if the user is logged in */}
      {isLoggedIn && (
        <Button onClick={logout} variant="warning" className="mx-2 small-button main-button">
          Sign Out
        </Button>
      )}
    </div>
  );
}