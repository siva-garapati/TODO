// import axios from 'axios'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginStyles.css'
import Cookies from "js-cookie";
import Context from './Context';

const Signin = () => {

  let [loginCredential,setloginCredential]=useState({'email':'',"password":''})
  let [msg,setMsg]=useState('')
  let navigate=useNavigate()
  let { setIsAuthenticated, setEmail }=useContext(Context)

  let handleLogin=()=>{
    if (Object.values(loginCredential).some(val => val.trim() === '')){
      alert("provide email and password")
      return;
    }
    axios.post('http://localhost:5000/login', loginCredential).then((res) => {
      if(!res.data.msg.includes('successful')){
        setMsg(res.data.msg)
      }else{
        console.log(res.data)
        Cookies.set("token", res.data.token)
        Cookies.set('email', loginCredential.email)
        setEmail(loginCredential.email)
        setIsAuthenticated(true)
        navigate('/')
      }
    })
  }
  return (
    <div className="login-container">
      <div className="logo">TODO</div>
      <p className="welcome-text">Welcome back! Manage your tasks efficiently.</p>
      
      <div className="login-box">
        <p style={{color:"White"}}>{msg}</p>
        <input
          type="text"
          value={loginCredential.email}
          placeholder="Enter Email"
          onChange={(e) => setloginCredential((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="password"
          value={loginCredential.password}
          placeholder="Enter Password"
          onChange={(e) => setloginCredential((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button onClick={handleLogin}>Login</button>

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button className="create-account">
          <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Create New Account</Link>
        </button>

        <div className="continue-without">
          <Link to="/tasks">Continue without an account</Link>
        </div>
      </div>
    </div>
  )
}

export default Signin