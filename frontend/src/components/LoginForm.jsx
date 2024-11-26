import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login_Register.css";

function LoginForm({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        setIsAuthenticated(true);
        localStorage.setItem("token",data.token);
        navigate("/reviews");
      
      } else {
       alert(`Error:${data.message}`);
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register"><button className="link-btn">Register</button></a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
