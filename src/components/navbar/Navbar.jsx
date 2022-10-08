import React, { useState } from 'react';
import { MdMenu, MdClose } from "react-icons/md";
import logo from '../../assets/logo.svg'
import './navbar.css'
import { Link } from 'react-router-dom'

const Menu = () => (
  <>
  <p><Link to="/">Home</Link></p>
  <p><Link to="/how">How It Works</Link></p>
  <p><Link to="/about">About</Link></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='navbar'>

      <div className="navbar-links">

        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>

      <div className="navbar-menu">
      {toggleMenu
          ? <MdClose color="#fff" size = {27} onClick={() => setToggleMenu(false)} />
          : <MdMenu color="#fff" size = {27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <Menu />
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar