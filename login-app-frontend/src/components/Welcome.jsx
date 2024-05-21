/* Welcome.js */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Welcome.css";

function Welcome() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get("http://localhost:8080/welcome", {
          withCredentials: true,
        });

        setMessage(response.data.message);
      } catch (error) {
        setMessage("You are not authorized to view this page.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    fetchWelcomeMessage();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="welcome-container">
      <h2>Welcome</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Welcome;
