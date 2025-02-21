import React, { useState } from 'react';
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

  // Smooth Scroll Function
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu(); // Close menu after clicking
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="redirectAnchorTag" onClick={closeMenu}>
          <img src={logo} alt="Campus Society Logo" className="logo" />
        </Link>
      </div>
      <nav>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><a href="#about" onClick={() => handleScroll("about")}>About</a></li>
          <li><a href="#contact" onClick={() => handleScroll("contact")}>Contact</a></li>
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
