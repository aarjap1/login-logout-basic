import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
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

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
