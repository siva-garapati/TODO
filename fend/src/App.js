import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Add from './components/Add'
import Tasks from './components/Tasks'
import axios from 'axios'
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

const App = () => {

    let [flag,setFlag]=useState(false)
    let [showSideBar, setShowSideBar]=useState(true)
    let [data,setData]=useState([])
    let [showPopup,setShowPopup]=useState(false)

    let [ctData,setCtData]=useState()

    useEffect(()=>{
        axios.get('http://localhost:5000/tasks').then((res)=>{
            console.log("data",res.data)
            setData(res.data)
        })
    },[flag])
  return (
    <Context.Provider value={{"ctData":ctData,"setCtData":setCtData}}>
    {showPopup && <Popup setFlag={setFlag} setShowPopup={setShowPopup}/>}
    <BrowserRouter>
        <Nav setShowSideBar={setShowSideBar}/>
        {showSideBar && <SideBar />}
        <main>
          <Routes>
            <Route path='/' element={<Tasks data={data} setShowPopup={setShowPopup} setFlag={setFlag}/>}/>
            <Route path='/add' element={<Add setFlag={setFlag}/>}/>
            <Route path='/completed' element={<CompletedTasks/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/task/:id' element={<OneTask/>}/>
            <Route path='/alltasks' element={<AllTasks/>}/>
            <Route path='/login' element={<Signin/>}/>
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </main>

    </BrowserRouter>
    </Context.Provider>
  )
}



export default App