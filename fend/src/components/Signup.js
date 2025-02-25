import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  let [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  let [msg, setMsg] = useState('');
  let navigate = useNavigate();

  let handleSignup = () => {
    if (Object.values(signupData).some(val => val.trim() === '')) {
      alert("All fields are required.");
      return;
    }
    axios.post('http://localhost:5000/register', signupData)
      .then((res) => {
        if (!res.data.msg.includes('successful')) {
          setMsg(res.data.msg);
        } else {
          navigate('/login');
        }
      })
      .catch(() => {
        setMsg("Signup failed. Try again.");
      });
  };

  return (
    <div className="login-container">
      <div className="logo">TODO</div>
      <p className="welcome-text">Create a new account and start managing tasks.</p>

      <div className="login-box">
        <p style={{ color: "white" }}>{msg}</p>
        <input
          type="text"
          value={signupData.name}
          placeholder="Enter Name"
          onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="email"
          value={signupData.email}
          placeholder="Enter Email"
          onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          value={signupData.password}
          placeholder="Enter Password"
          onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button onClick={handleSignup}>Sign Up</button>

        <div className="continue-without">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;