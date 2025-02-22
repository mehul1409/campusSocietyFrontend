import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '/mainLogo.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu if user clicks outside of the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header')) {
        closeMenu();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Smooth Scroll Function
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // Close menu after clicking
    }
  };

  return (
    <header className="header" onClick={(e) => e.stopPropagation()}>
      <div className="logo-container">
        <Link to="/" className="redirectAnchorTag" onClick={closeMenu}>
          <img src={logo} alt="Campus Society Logo" className="logo" />
        </Link>
      </div>
      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Nav;
