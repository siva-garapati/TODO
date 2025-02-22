import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({setShowSideBar}) => {
  return (
    <nav>
        <i className="fa-solid fa-bars" onClick={() => setShowSideBar(prev=>!prev)}></i>
        <Link to='/'><h1>TODO</h1></Link>
        <div className='signin'>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign up</Link>
        </div>
    </nav>
  )
}

export default Nav