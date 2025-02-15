import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 // Ensure Bootstrap is imported

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/api/auth/local/register", {
        username,
        email,
        password,
      });

      setAlert({ type: "success", message: " Registration successful! You can now log in." });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setAlert({ type: "danger", message: " Registration failed. Please try again." });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 text-white">
      <div className="card p-4 shadow-lg bg-dark text-white" style={{ width: "400px" }}>
        <h2 className="text-center">Register</h2>

        {alert && <div className={`alert alert-${alert.type} text-center`}>{alert.message}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100">Register</button>

          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <button className="btn btn-outline-light w-100" onClick={() => navigate("/login")}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
