import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Nav from './components/Nav'
import Add from './components/Add'
import Tasks from './components/Tasks'
import './App.css'
import Popup from './components/Popup'
import Context from './components/Context'
import CompletedTasks from './components/CompletedTasks'
import SideBar from './components/SideBar'
import Dashboard from './components/Dashboard'
import OneTask from './components/OneTask'
import AllTasks from './components/AllTasks'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import Cookies from 'js-cookie'


const App = () => {
  let [flag,setFlag]=useState(false)
  let [showSideBar, setShowSideBar]=useState(true)
  let [showPopup,setShowPopup]=useState(false)

  let [token]=useState(Cookies.get('token'))

  const [isAuthenticated,setIsAuthenticated] = useState(token!==undefined)

  const [email,setEmail]=useState(Cookies.get('email'))

  let [ctData,setCtData]=useState()

  // useEffect(() => {
  //   if (token) {
  //     Cookies.set('token', token);
  //     setIsAuthenticated(true);
  //   } else {
  //     Cookies.remove('token');
  //     setIsAuthenticated(false);
  //   }

  //   if (email) {
  //     Cookies.set('email', email);
  //   } else {
  //     Cookies.remove('email');
  //   }
  // }, [token, email]); 

  const contextObj={
    ctData,
    setCtData,
    setShowPopup,
    setShowSideBar,
    isAuthenticated,
    setIsAuthenticated,
    email,
    setEmail,
    token
  }

  return (
    <Context.Provider value={contextObj}>
      <Router>
        {showPopup && <Popup setShowPopup={setShowPopup} setFlag={setFlag} />}
        {!isAuthenticated ? (
          <Routes>
            <Route path='/login' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        ):(
          <>
          <Nav setShowSideBar={setShowSideBar} />
          {showSideBar && <SideBar />}
          <main>
            <Routes>
              <Route path='/' element={<Tasks setShowPopup={setShowPopup} setFlag={setFlag} flag={flag} />} />
              <Route path='/add' element={<Add />} />
              <Route path='/completed' element={<CompletedTasks />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/task/:id' element={<OneTask />} />
              <Route path='/alltasks' element={<AllTasks />} />
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </main>
          </>
        )}
      </Router>
    </Context.Provider>
  )
}

export default App