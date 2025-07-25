import React, { useState } from "react";
import { GiFarmer } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const setCookie = (name, value, days) => {
    let expires = "";
    console.log(`From function: ${value}`);
    
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/;";
    console.log(`From cookie: ${document.cookie}`);
   }
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/auth/api/token/', {
          email,
          password
          }).then((response) => {
              console.log(response.data);
              setCookie("access_token", response.data.access, 1);
              setCookie("refresh_token", response.data.refresh, 1);
              navigate("/chat");
              console.log('Done');
              

              if (response.status === 401){
                console.log('There is no account with this credentials');
              }
          }).catch((err) => {
            console.log(err);
          })
    console.log("Login attempted with:", { email, password });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    const decoded_data = jwtDecode(credentialResponse.credential)
    const email = decoded_data.email
    const sub = decoded_data.sub
    axios.post('http://localhost:8000/auth/api/token/', {
      email,
      sub
      }).then((response) => {
          console.log(response.data);
          setCookie("access_token", response.data.access, 1);
          setCookie("refresh_token", response.data.refresh, 1);
          navigate("/chat");

          if (response.status === 401){
            console.log('There is no account with this credentials');
          }
      }).catch((err) => {
        console.log(err);
      })
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <GiFarmer className="header-icon" />
        <h1 className="header-title">GreenDale</h1>
      </div>
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="login-input"
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="divider">or</div>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black" // Fixed to dark mode
            size="large"
            text="Log in with Google"
          />
        </div>
      </div>
      <p className="signup-link">
        Don’t have an account? <a href="/">Sign up</a>
      </p>
    </div>
  );
};

export default Login;