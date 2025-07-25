import React from "react";
import { GiFarmer } from "react-icons/gi";
import { FiPaperclip } from "react-icons/fi"; // Added import for FiPaperclip
import { IoPersonCircle } from "react-icons/io5"; // Added import for IoPersonCircle
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup"); // Updated to match /signup route
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="header-logo">
          <GiFarmer className="header-icon" />
          <h1 className="header-title">GreenDale</h1>
        </div>
        <nav className="header-nav">
          <a href="/signup" className="nav-link">Sign Up</a>
          <a href="/login" className="nav-link">Log In</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">Welcome to GreenDale</h2>
        <p className="hero-subtitle">Your AI companion for smarter farming and beyond.</p>
        <button className="hero-cta" onClick={handleSignupClick}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3 className="features-title">Why Choose GreenDale?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <GiFarmer className="feature-icon" />
            <h4>AI-Powered Chat</h4>
            <p>Get instant answers and insights from our intelligent AI system.</p>
          </div>
          <div className="feature-card">
            <FiPaperclip className="feature-icon" />
            <h4>File Uploads</h4>
            <p>Upload files for analysis and personalized responses.</p>
          </div>
          <div className="feature-card">
            <IoPersonCircle className="feature-icon" />
            <h4>Recent Searches</h4>
            <p>Keep track of your past interactions effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 GreenDale. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;