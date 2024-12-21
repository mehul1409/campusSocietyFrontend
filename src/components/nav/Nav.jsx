import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div>
      <header className="header">
        <h1>Campus Society</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="#about">About</Link></li>  {/* Changed to #about */}
            <li><Link to="#features">Features</Link></li>  {/* Changed to #features */}
            <li><Link to="#contact">Contact</Link></li>  {/* Changed to #contact */}
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to='/login'>Login</Link>  {/* Changed to /login */}
          <Link to='/register'>Register</Link>  {/* Changed to /register */}
        </div>
      </header>
    </div>
  );
}

export default Nav;
