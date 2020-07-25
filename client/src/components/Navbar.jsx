import React,{ useContext }  from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)


    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }
    

    return (
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">Link Cutting </a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><NavLink to="/create">Create</NavLink></li>
        <li><NavLink to="/links">Ссылки</NavLink></li>
        <li><a href="/" onClick={logoutHandler}>Exit</a></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar
