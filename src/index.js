import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import ChatInterface from './App.js';
import Signup from './Signup.js';
import Login from './login.js';
import Landing from './Landing.js'; // Add Landing import
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1034585151782-59g5e5cj19em9e6b3nj7e3l052n82orq.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Landing page as root */}
          <Route path="/signup" element={<Signup />} /> {/* Adjusted Signup route */}
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();