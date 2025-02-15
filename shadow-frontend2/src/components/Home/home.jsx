import './home.scss';
import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/bg-home.jpg'


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100  text-white"
    style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="text-center">
        <h1 className="fw-bold display-2"> Welcome to Shadow Chat</h1>
        <p className="lead fs-3">Connect & Chat with the server!</p>

        <div className="d-flex gap-3 mt-4 justify-content-center">
          <button className="btn btn-outline-light btn-lg fw-bold px-4" onClick={() => navigate("/login")}>Login</button>
          <button className="btn btn-outline-light btn-lg fw-bold px-4" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
