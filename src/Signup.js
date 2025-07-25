import React, { useState } from "react";
import { GiFarmer } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
   axios.post('http://localhost:8000/auth/create-user/', {
      email,
      password
      }).then((response) => {
        console.log(`Status: ${response.status}`);
        
        if (response.status === 200){
          console.log(response.data);
          navigate("/chat");
        }else{
          console.log(response.data);
          console.log(`A user with this email already exists`);
        }
      }).catch((err) => {
        console.log(err);
      })
    console.log("Signup attempted with:", { email, password });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Sign-In Success:", credentialResponse);
    const decoded_data = jwtDecode(credentialResponse.credential)
    const email = decoded_data.email
    const sub = decoded_data.sub
    axios.post('http://localhost:8000/auth/google-signup/', {
      email,
      sub
      }).then((response) => {
        if (response.status === 200){
          console.log(response.data);
          navigate("/chat");
        }else{
          console.log(response.data);
          console.log(`A user with this email already exists`);
        }
      }).catch((err) => {
        console.log(err);
      })
  };

  const handleGoogleError = () => {
    console.log("Google Sign-In Failed");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <GiFarmer className="header-icon" />
        <h1 className="header-title">GreenDale</h1>
      </div>
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="signup-input"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="signup-input"
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="divider">or</div>
        <div className="google-signin">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black" // Fixed to dark mode
            size="large"
            text="Sign up with Google"
          />
        </div>
      </div>
      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Signup;