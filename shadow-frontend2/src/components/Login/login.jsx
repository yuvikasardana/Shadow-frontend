import React, { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,  // Strapi uses 'identifier' instead of 'email'
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        login(data.jwt); // Store the real token from Strapi
        localStorage.setItem("username", data.user.username);
        navigate("/chat");
      } else {
        alert(data.error.message); // Show error from backend
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100 text-white'>
      <div className="card p-4 shadow-lg bg-dark text-white" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

     
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
          <button className="btn btn-outline-light w-100" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
