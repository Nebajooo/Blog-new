import { useState } from "react";
import axios from "../api/axiosConfig.js";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate(res.data.role === "admin" ? "/admin" : "/posts");
    } catch (err) {
      alert("incorrect password or email");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      {/* <h2>Login</h2> */}
      <div className="form-title">
        <span>sign in to your</span>
      </div>
      <div className="title-2">
        <span>SPACE</span>
      </div>
      <div className="input-container">
        <input
          className="input-mail"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span></span>
      </div>
      <section className="bg-stars">
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
        <span className="star"></span>
      </section>
      <div className="input-container">
        <input
          className="input-pwd"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="submit" type="submit">
        <span className="sign-text">Login</span>
      </button>
      <p className="signup-link">
        {" "}
        No account?{" "}
        <a className="up" href="">
          Register
        </a>
      </p>
    </form>
  );
}
