import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <aside>
        <NavLink to='/'>Pending Tasks</NavLink>
        <NavLink to="/add">Add Task</NavLink>
        <NavLink to='/completed'>Completed Tasks</NavLink>
        <NavLink to='/alltasks'>All Tasks</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
        <NavLink to='/Logout'>Logout</NavLink>
    </aside>
  )
}

export default SideBar