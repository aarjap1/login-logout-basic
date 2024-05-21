/* Login.js */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
      if (response.status === 200) {
        navigate("/welcome");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
    <>
      <div className="demo">
        <p>DEMO LOGIN DETAILS</p>
        <p>username : user</p>
        <p>password : password</p>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    </>
  );
}

export default Login;
