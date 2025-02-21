import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        {/* <i className="fa-solid fa-bars"></i> */}
        <Link to='/'><h1>TODO</h1></Link>
    </nav>
  )
}

export default Nav