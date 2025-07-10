import { useState } from "react";
import axios from "../api/axiosConfig.js";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css"; // Reuse the same styles

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { email, password, username });
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <div className="form-title">
        <span>create your</span>
      </div>
      <div className="title-2">
        <span>SPACE</span>
      </div>

      <div className="input-container">
        <input
          className="input-user"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <input
          className="input-mail"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-container">
        <input
          className="input-pwd"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="submit" type="submit">
        <span className="sign-text">Register</span>
      </button>

      <p className="signup-link">
        Already have an account?{" "}
        <Link className="up" to="/login">
          Login
        </Link>
      </p>

      <section className="bg-stars">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </section>
    </form>
  );
}
