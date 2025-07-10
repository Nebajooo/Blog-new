import React from "react";
import { Link } from "react-router-dom";
import "../css/Card.css";

export default function Home() {
  return (
    <div className="container-main">
      <h1 className="home-title">🌸 Welcome to BlogNest</h1>
      <p className="home-subtext">
        A cozy place to read, write, and share your ideas.
      </p>

      <div className="card-container-main">
        <div className="card">
          <div className="container">
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="container">
            <Link to="/register">
              <button className="button">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
