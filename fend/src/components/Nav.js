import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Context from './Context';

const Nav = ({setShowSideBar}) => {

  const navigate = useNavigate();
  const {setIsAuthenticated}=useContext(Context)

  const handleLogout=()=>{
    Cookies.remove("token");
    Cookies.remove("email");
    setIsAuthenticated(false)
    navigate('/login')
  }
  return (
    <nav>
        <div className='menu-icon'><i className="fa-solid fa-bars" onClick={() => setShowSideBar(prev=>!prev)}></i></div>
        <div className='logo'><Link to='/'>TODO</Link></div>
        <div className='logout' onClick={handleLogout}>Logout</div>
    </nav>
  )
}

export default Nav