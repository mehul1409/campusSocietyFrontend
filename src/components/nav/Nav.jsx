import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '/mainLogo.png'; 

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <Link to='/' className='redirectAnchorTag'>
          <img src={logo} alt="Campus Society Logo" className="logo" />
          <h1>Campus Society</h1>
          </Link>
        </div>
        <nav>
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>
    </div>
  );
}

export default Nav;
